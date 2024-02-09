import axios from "../axios/axios";
import { ProductType } from "../utils/constants";

export const editProduct = async (payload: ProductType) => {
  try {
    const response = await axios.put("/api/product", payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
