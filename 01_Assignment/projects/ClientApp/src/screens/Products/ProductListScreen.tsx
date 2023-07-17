import React from "react";
import useGetProducts from "../../hooks/useGetProducts";

const ProductListScreen = () => {
  const { data } = useGetProducts();
  return (
    <ul>
      {data?.map((product) => (
        <li>
          {product.id} - {product.name}
        </li>
      ))}
    </ul>
  );
};

export default ProductListScreen;
