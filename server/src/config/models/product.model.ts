import mongoose, { Schema } from "mongoose";

export interface ProductAttributes {
  _id: Schema.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

const ProductSchema: Schema<ProductAttributes> = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
  },
});

const ProductModel = mongoose.model<ProductAttributes>(
  "Product",
  ProductSchema
);

export default ProductModel;
