import ApiClient from "./ApiClient";

export interface Product {
  id: number;
  name: string;
  globalTradeItemNumber: string;
  materialNumber: string;
  vendoer: string;
  unitOfMeasure: string;
  createdDate: Date;
  updatedDate: Date;
  productCategory: ProductCategory;
  isActive: boolean;
}
export enum ProductCategory {
  Reagent,
  Consumable,
}
const ProductService = (id = "") => {
  const url = id ? `/api/product/${id}` : `/api/product`;
  return new ApiClient<Product>(url);
};
export default ProductService;
