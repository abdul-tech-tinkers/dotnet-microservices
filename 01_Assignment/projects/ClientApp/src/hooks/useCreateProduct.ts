import { QueryClient, useMutation } from "@tanstack/react-query";
import ProductService, { Product } from "../services/ProductService";
import { AxiosError } from "axios";

const query = new QueryClient();

const useCreateProduct = () => {
  return useMutation<Product, AxiosError, Product>({
    mutationFn: ProductService.post,
    onMutate: async () => {
      await query.invalidateQueries({ queryKey: ["getallproducts"] });
    },
    onError: (error) => {
      console.log(error.response?.data);
    },
  });
};

export default useCreateProduct;
