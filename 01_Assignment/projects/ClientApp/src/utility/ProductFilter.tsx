import { ProductFilter } from "../screens/Products/FilterProductScreen";
import { Product } from "../services/ProductService";

export const ProductFilterFunc = (
  products: Product[],
  filter: ProductFilter | undefined
) => {
  if (!filter) return products;
  let filteredProduct: Product[] = products;

  console.log(filter);
  if (filter.name) {
    filteredProduct = filteredProduct.filter((p) =>
      p.name.toLocaleLowerCase().includes(filter.name.toLocaleLowerCase())
    );
  }

  if (filter.GTIN) {
    filteredProduct = filteredProduct.filter(
      (p) => p.globalTradeItemNumber === filter.GTIN
    );
  }

  if (filter.isActive) {
    filteredProduct = filteredProduct.filter(
      (p) => p.isActive === filter.isActive
    );
  }

  if (filter.materialNumber) {
    filteredProduct = filteredProduct.filter(
      (p) => p.materialNumber === filter.materialNumber
    );
  }

  if (filter.vendor) {
    filteredProduct = filteredProduct.filter((p) =>
      p.vendoer.toLocaleLowerCase().includes(filter.vendor.toLocaleLowerCase())
    );
  }

  if (filter.category) {
    filteredProduct = filteredProduct.filter(
      (p) =>
        parseInt(p.productCategory.toString()) ===
        parseInt(filter.category.toString())
    );
  }

  return filteredProduct;
};
