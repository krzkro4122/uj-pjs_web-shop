import { useCart } from "react-use-cart";

import {IGood} from "../interface";

export interface CardProps {
  good: IGood,
  quan: number,
  key: string
}

const Card = (props: CardProps) => {
  const { addItem, inCart, updateItemQuantity, getItem } = useCart();

  return (
    <div className="shadow-md w-80 p-1 m-2 float-left border-solid border border-black rounded">
        <div className='flex justify-center'>
          <img src={props.good.thumbnail} alt="Item's thumbnail" className='shadow-md max-h-52'/>
        </div>
        <div className='flex justify-between p-2 pt-4'>
          <p><b>{props.good.name}</b></p>
          <span className='text-gray-500'>{props.good.group}</span>
        </div>
        <div className='flex justify-between p-2'>
          <button onClick={
            () => {
              props.good.id = props.good.name;

              if (inCart(props.good.id)) {
                const good: IGood = getItem(props.good.id);
                good.quantity! < props.good.stock ? updateItemQuantity(props.good.id, good.quantity + 1) : alert("None left!")
              } else {
                const item = {
                  id: props.good.id,
                  price: props.good.price,
                  quantity: props.good.quantity,
                  name: props.good.name,
                  group: props.good.group,
                  stock: props.good.stock,
                  thumbnail: props.good.thumbnail
                }
                addItem(props.good, 1)
                props.good.quantity = 1;
              }
            }
          }><span className="border shadow-md rounded-md border-gray-400 p-1 hover:bg-gray-100 active:bg-gray-300">Buy</span> for ${props.good.price}</button>
          <span className='text-gray-500'>{props.good.stock} pcs.</span>
        </div>
    </div>
  );
};

export default Card
