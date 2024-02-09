import axios from "../axios/axios";
import { ProductType } from "../utils/constants";

export const editProduct = async (payload: ProductType) => {
  try {
    await axios.put("/api/product", payload);
  } catch (error) {
    return Promise.reject(error);
  }
};
