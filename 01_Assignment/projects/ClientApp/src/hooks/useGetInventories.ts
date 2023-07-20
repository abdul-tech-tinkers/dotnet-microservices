import { useQuery } from "@tanstack/react-query";
import InventoryService from "../services/InventoryService";

const useGetInventories = () => {
  return useQuery({
    queryKey: ["getAllInventories"],
    queryFn: InventoryService().getAll,
  });
};
export default useGetInventories;
