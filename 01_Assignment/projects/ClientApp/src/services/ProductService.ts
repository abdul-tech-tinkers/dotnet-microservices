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

export default new ApiClient<Product>("/api/product");
