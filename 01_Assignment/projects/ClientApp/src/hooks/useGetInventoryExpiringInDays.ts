import { useQuery } from "@tanstack/react-query";
import InventoryService from "../services/InventoryService";

const useGetInventoryExpiringInDays = (days = 7) => {
  return useQuery({
    queryKey: ["GetProductItemExpiryInDays", days],
    queryFn: InventoryService(`GetProductItemExpiryInDays/${days}`).getAll,
  });
};
export default useGetInventoryExpiringInDays;
