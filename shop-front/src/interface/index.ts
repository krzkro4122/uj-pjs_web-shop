import { Item } from "react-use-cart";

type Dispatch<A> = (value: A) => void;

export interface IGood extends Item {
  name: string;
  group: string;
  stock: number;
  thumbnail: string;
  price: number;
  quantity: number;
}

export type IShopContextState = {
  goods: IGood[];
  setGoods: CallableFunction;
}
