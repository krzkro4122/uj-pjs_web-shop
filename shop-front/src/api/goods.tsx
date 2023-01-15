import { IGood } from "../interface";
import axios from "axios";

export const fetchGoods = async (): Promise<IGood[]> => {
  try {
  const response = await axios.get(`http://localhost:8080/goods`);
  return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchGoods
