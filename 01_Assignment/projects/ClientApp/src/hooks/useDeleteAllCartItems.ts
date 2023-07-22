import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import InventoryService from "../services/InventoryService";
import CartService from "../services/CartService";

const useDeleteAllCartItems = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CartService().deleteAll,
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["getAllCarts"],
      });
    },
    onError: (error) => {
      console.log(error.response?.data);
    },
  });
};

export default useDeleteAllCartItems;
