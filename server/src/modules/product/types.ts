import { ProductAttributes } from "../../config/models/product.model";

export interface ProductServiceType {
  getAllProducts: () => Promise<Array<ProductAttributes>>;
  addProduct: (data: ProductAttributes) => Promise<void>;
  updateProduct: (data: Partial<ProductAttributes>) => Promise<void>;
  deleteProduct: (data: { _id: string }) => Promise<void>;
  upload: (file: any, params: { _id: string }) => Promise<void>;
}
