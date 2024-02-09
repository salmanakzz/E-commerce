import mongoose, { Schema } from "mongoose";

export interface CartAttributes {
  _id: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  count: number;
}

const CartSchema: Schema<CartAttributes> = new Schema({
  productId: {
    type: Schema.ObjectId,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const CartModel = mongoose.model<CartAttributes>("Cart", CartSchema);

export default CartModel;
