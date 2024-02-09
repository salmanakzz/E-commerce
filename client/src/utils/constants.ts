export interface ProductType {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  cartCount?: number;
}

export interface CartType {
  _id?: string;
  productId: string;
  count: number;
}
