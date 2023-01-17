import { IGood } from "../interface";
import axios from "axios";
import { Item } from "react-use-cart";

axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const fetchGoods = async (): Promise<IGood[]> => {
  try {
  const response = await axios.get(`http://localhost:8080/goods`);
  return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const buyGoods = async (goods: Item[]): Promise<string> => {
  try {
    const response = await axios.post(`http://localhost:8080/goods/buy`, goods);
    return response.data;
  } catch (error) {
    console.error(error);
    return `ERROR: ${error}`;
  }
}

export default {
  fetchGoods: fetchGoods,
  buyGoods: buyGoods
};
