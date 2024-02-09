import axios from "../axios/axios";

export const upload = async (payload: FormData, _id: string) => {
  try {
    const response = await axios.post(`/api/product/upload/${_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
