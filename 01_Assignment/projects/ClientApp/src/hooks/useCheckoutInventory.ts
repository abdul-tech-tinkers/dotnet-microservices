import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import InventoryService, { Inventory } from "../services/InventoryService";

const useCheckoutInventory = () => {
  const queryClient = useQueryClient();
  return useMutation<Inventory, AxiosError, Inventory>({
    mutationFn: InventoryService("checkout").post,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getAllInventories"],
      });
    },
    onError: (error) => {
      console.log(error.response?.data);
    },
  });
};

export default useCheckoutInventory;
