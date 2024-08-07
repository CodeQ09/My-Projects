import axios from "axios";
import { IProducts } from "../../utils/models";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/shop",
  withCredentials: true,
});

export const fetchProducts = async (): Promise<IProducts[]> => {
  try {
    const response = await axiosInstance.get("/");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProduct = async (
  productId: string | undefined
): Promise<IProducts> => {
  try {
    const response = await axiosInstance.get(`/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
