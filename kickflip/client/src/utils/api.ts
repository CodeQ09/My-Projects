import axios from "axios";
import { Products } from "./models";

const URL = "http://localhost:4000";

export const fetchProducts = async (): Promise<Products[]> => {
  const response = await axios.get(`${URL}/products`, {
    withCredentials: true,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }

  return response.data;
};