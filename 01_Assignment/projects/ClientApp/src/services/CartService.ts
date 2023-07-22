import ApiClient from "./ApiClient";

export interface Cart {
  quantity: number;
  serializedGlobalTradeItemNumber: string;
  productName: string;
  vendorName: string;
}

const CartService = (url = "") => {
  const endpoint = url ? `/api/carts/${url}` : `/api/carts`;
  return new ApiClient<Cart>(endpoint);
};
export default CartService;
