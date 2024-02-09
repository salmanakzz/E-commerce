import CartModel from "../../config/models/cart.model";
import { CartServiceType } from "./types";

const CartController = () =>
  ({
    addToCart: async (data) => {
      try {
        const cartItem = await CartModel.findOne({ productId: data.productId });
        if (cartItem) {
          cartItem.count = cartItem.count + data.count;
          cartItem.save();
        } else {
          await CartModel.create(data);
        }
      } catch (error) {
        console.error(error);
        return error;
      }
    },
  } as CartServiceType);

export default CartController;
