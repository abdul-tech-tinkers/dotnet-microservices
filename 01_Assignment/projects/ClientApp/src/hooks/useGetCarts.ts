import CartService, { Cart } from "../services/CartService";
import { useQuery } from "@tanstack/react-query";

const useGetCarts = () => {
  return useQuery<Cart[], Error>({
    queryKey: ["getAllCarts"],
    queryFn: CartService().getAll,
  });
};
export default useGetCarts;
