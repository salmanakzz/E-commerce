import { CartAttributes } from "../../config/models/cart.model";

export interface CartServiceType {
  getAllCartItems: () => Promise<Array<CartAttributes>>;
  addToCart: (data: CartAttributes) => Promise<void>;
  updateCart: (data: Partial<CartAttributes>) => Promise<void>;
  deleteFromCart: (data: { _id: string }) => Promise<void>;
}
