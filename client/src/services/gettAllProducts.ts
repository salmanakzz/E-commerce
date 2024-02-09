import axios from "../axios/axios";

export const getAllProducts = async () => {
  try {
    const response = await axios.get("/api/product");
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
