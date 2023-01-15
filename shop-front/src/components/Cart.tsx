import React, {useContext} from "react";
import { CartProvider, useCart } from "react-use-cart";

import {IGood} from "../interface";
import ShopContext from "../contexts/ShopContext";

const priceFormat = (num: number): string => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    totalItems,
    cartTotal
  } = useCart();

  if (isEmpty) return <p className="m-20 text-2xl align-middle">Your cart is <b>empty</b> 🚮 <br/>Go to <b>Browse</b> 🔝</p>;

  return (
    <div className="align-middle m-20">
      <h1 className="p-4 text-2xl"><b className="rounded-md border-2 border-gray-400 shadow-md p-2">Your shopping cart: 🛒</b></h1>
      <div className="pb-4 pt-2 pl-5 ">
        <h2>Total item count: {totalItems}</h2>
        <h2>Total distinctitem count: {totalUniqueItems}</h2>
        <h2>Total price: ${priceFormat(cartTotal)}</h2>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item.id} className='pl-4'>
            <span className=" pr-2">
              <button className="pr-1 pl-1 m-0.5 text-2xl rounded-md shadow-md border border-gray-400 hover:bg-gray-100 active:bg-gray-300 "
                onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                ➖
              </button>
              <button className="text-2xl m-0.5 pl-1 pr-1 rounded-md border shadow-md border-gray-400 hover:bg-gray-100 active:bg-gray-300 "
                onClick={() => item.quantity < item.stock ? updateItemQuantity(item.id, item.quantity + 1) : alert("None left!")}
                >
                ➕
              </button>
              <button className="text-2xl m-0.5 pl-1 pr-1 rounded-md border shadow-md border-gray-400 hover:bg-gray-100 active:bg-gray-300 "
                onClick={() => removeItem(item.id)}
                >
                ✖️
                </button>
            </span>
            <span className="text-xl pl-0.5 pt-0.5">
              {item.name} x{item.quantity} (${priceFormat(item.quantity * item.price)})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;