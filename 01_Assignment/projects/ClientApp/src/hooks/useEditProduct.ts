import { useMutation, useQueryClient } from "@tanstack/react-query";
import ProductService, { Product } from "../services/ProductService";
import { AxiosError } from "axios";

const useEditProduct = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<Product, AxiosError, Product>({
    mutationFn: ProductService(id).put,
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getallproducts"] });
    },
    onError: (error) => {
      console.log(error.response?.data);
    },
  });
};

export default useEditProduct;
