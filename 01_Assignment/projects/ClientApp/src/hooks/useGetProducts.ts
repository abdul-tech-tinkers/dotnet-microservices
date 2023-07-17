import ProductService, { Product } from "../services/ProductService";
import { useQuery } from "@tanstack/react-query";

const useGetProducts = () => {
  return useQuery<Product[], Error>({
    queryKey: ["getallproducts"],
    queryFn: ProductService.getAll,
  });
};
export default useGetProducts;
