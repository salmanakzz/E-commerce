import { ERRORS } from "../../utils/constants";
import { ProductServiceType } from "./types";

const ProductValidator = () =>
  ({
    getAllProducts: () => {
      return;
    },
    addProduct: (data) => {
      if (
        !data ||
        !data.name ||
        !data.description ||
        !data.price ||
        !data.imgUrl
      )
        return Promise.reject(ERRORS.INVALID_CREDS);
      return Promise.resolve();
    },
    updateProduct: (data) => {
      if (!data) return Promise.reject(ERRORS.INVALID_CREDS);
      return Promise.resolve();
    },
    deleteProduct: (data) => {
      if (!data || !data._id) return Promise.reject(ERRORS.INVALID_CREDS);
      return Promise.resolve();
    },
    upload: (file, { _id }) => {
      if (!file || !file.filename || !_id)
        return Promise.reject(ERRORS.INVALID_CREDS);
      return Promise.resolve();
    },
  } as ProductServiceType);

export default ProductValidator;
