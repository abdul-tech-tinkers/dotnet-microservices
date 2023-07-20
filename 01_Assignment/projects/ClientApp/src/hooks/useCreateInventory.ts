import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import InventoryService, { Inventory } from "../services/InventoryService";

const useCreateInventory = () => {
  const queryClient = useQueryClient();
  return useMutation<Inventory, AxiosError, Inventory>({
    mutationFn: InventoryService("checkin").post,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getAllInventories"] });
    },
    onError: (error) => {
      console.log(`useCreateInventory ${error.response?.data}`);
    },
  });
};

export default useCreateInventory;
