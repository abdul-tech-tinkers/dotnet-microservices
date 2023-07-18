import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductService, { Product } from "../services/ProductService";
import { AxiosError } from "axios";

const useDeRegisterProduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Product, AxiosError>({
    mutationFn: ProductService(id).post,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getallproducts"] });
    },
  });
};
export default useDeRegisterProduct;
