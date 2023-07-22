import { useQuery } from "@tanstack/react-query";
import InventoryService from "../services/InventoryService";

const useGetDailyInventories = () => {
  return useQuery({
    queryKey: ["getDailyInventoryStatus"],
    queryFn: InventoryService("GetDailyInventoryStatus").getAll,
  });
};
export default useGetDailyInventories;
