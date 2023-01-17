import { useEffect, useState, useContext } from 'react';
import ShopContext from "../contexts/ShopContext";
// import useCart from "../hooks/useCart";
import { IGood } from '../interface';
import Card from './Card';

export interface GoodsProps {}

export const ShopPane = (props: GoodsProps): JSX.Element => {
    const { goods } = useContext(ShopContext)
    // const { cart, addGood, removeGood } = useCart();

    return (
        <div className='p-2' key={1}>
            {goods?.map((good: IGood) => <Card good={good} quan={good.quantity} key={good.name+Date.now().toString()}/>)}
        </div>
    );
};

export default ShopPane;