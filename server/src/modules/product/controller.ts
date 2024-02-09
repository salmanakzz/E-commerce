import CartModel from "../../config/models/cart.model";
import ProductModel from "../../config/models/product.model";
import { ProductServiceType } from "./types";

const ProductController = () =>
  ({
    getAllProducts: async () => {
      try {
        const products = await ProductModel.find();
        const cartItems = await CartModel.find();

        return { products, cartItems };
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    addProduct: async (data) => {
      try {
        const result = await ProductModel.create(data);
        return { _id: result._id };
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    updateProduct: async (data) => {
      const { _id, ...rest } = data;
      try {
        await ProductModel.updateOne({ _id }, { $set: rest });
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    deleteProduct: async ({ _id }) => {
      try {
        await ProductModel.deleteOne({ _id });
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    upload: async (file, params) => {
      try {
        const product = await ProductModel.findOne({ _id: params._id });
        if (product) {
          product.imgUrl = file.filename;
          product.save();
        } else {
          console.log("Product not found");
        }
      } catch (error) {
        console.error(error);
      }
    },
  } as ProductServiceType);

export default ProductController;
