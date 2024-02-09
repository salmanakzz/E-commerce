import axios from "../axios/axios";
import { ProductType } from "../utils/constants";

export const deleteProduct = async ({ _id }: Partial<ProductType>) => {
  try {
    const response = await axios.delete(`/api/product/${_id}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
