import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import InventoryService, { Inventory } from "../services/InventoryService";

const useEditInventory = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Inventory, AxiosError, Inventory>({
    mutationFn: InventoryService(id).put,
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

export default useEditInventory;
