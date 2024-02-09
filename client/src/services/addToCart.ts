import axios from "../axios/axios";
import { CartType } from "../utils/constants";

export const addToCart = async (payload: CartType) => {
  try {
    const response = await axios.post(`/api/cart`, payload);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
