import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import CartService, { Cart } from "../services/CartService";

const useCreateCart = () => {
  const queryClient = useQueryClient();
  return useMutation<Cart, AxiosError, Cart>({
    mutationFn: CartService().post,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getAllCarts"] });
    },
    onError: (error) => {
      console.log(`useCreateInventory ${error.response?.data}`);
    },
  });
};

export default useCreateCart;
