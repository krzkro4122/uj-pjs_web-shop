import { IGood } from "../interface";

export const fetchGoods = async (): Promise<IGood[]> => {
  const response = await fetch(`http://localhost:8080/goods`)
    .then(response => response.json())
  return response
}

export default fetchGoods
