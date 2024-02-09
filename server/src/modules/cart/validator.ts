import { ERRORS } from "../../utils/constants";
import { CartServiceType } from "./types";

const CartValidator = () =>
  ({
    addToCart: async (data) => {
      if (!data || !data.count || !data.productId)
        return Promise.reject(ERRORS.INVALID_CREDS);
      return Promise.resolve();
    },
  } as CartServiceType);

export default CartValidator;
