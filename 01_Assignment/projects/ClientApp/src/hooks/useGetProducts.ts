import ProductService, { Product } from "../services/ProductService";
import { useQuery } from "@tanstack/react-query";

const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["getallproducts"],
    queryFn: ProductService.getAll,
    staleTime: 5 * 60 * 1000,
  });
};
export default useGetProducts;
