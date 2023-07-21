import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import InventoryService from "../services/InventoryService";

const useDeleteInventory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: InventoryService().delete,
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

export default useDeleteInventory;
