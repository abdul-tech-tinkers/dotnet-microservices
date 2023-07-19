import ApiClient from "./ApiClient";

export interface Inventory {
  id: number;
  lot: string;
  serializedGlobalTradeItemNumber: string;
  expirationDate: Date;
  reasonForCheckout: CheckoutReason;
  checkInDate: Date;
  checkOutDate: Date;
  productId: string;
}
export enum CheckoutReason {
  None,
  Expired,
  Consumption,
  LostAndNotFound,
  Leakage,
  RemovedFromSystem,
}
const InventoryService = (url = "") => {
  const endpoint = url ? `/api/product/${url}` : `/api/product`;
  return new ApiClient<Inventory>(endpoint);
};
export default InventoryService;
