import { useQuery } from "@tanstack/react-query";
import InventoryService from "../services/InventoryService";

const useGetExpiredInventory = (days = 7) => {
  return useQuery({
    queryKey: ["GetExpiredProductItems"],
    queryFn: InventoryService(`GetExpiredProductItems`).getAll,
  });
};
export default useGetExpiredInventory;
