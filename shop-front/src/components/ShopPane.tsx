import './ShopPane.css'
import Card from './Card';
import { useEffect, useState } from 'react';

const ShopPane = (): JSX.Element => {

    const [data, updateData] = useState<any[]>();

    useEffect(() => {
        const getGoods = async () => {
            const response = await fetch("http://localhost:8080/goods");
            const json = await response.json();
            updateData(json);
        };
        getGoods();
    }, []);

    return (
        <div className='p-2'>
            {data?.map((dataPiece: object, index: number) => <Card data={dataPiece} key={index} />)}
        </div>
    );
};

export default ShopPane;