import axios from "../axios/axios";
import { ProductType } from "../utils/constants";

export const addProduct = async (payload: ProductType) => {
  try {
    const response = await axios.post("/api/product", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
