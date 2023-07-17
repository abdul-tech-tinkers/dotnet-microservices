import React from "react";
import useGetProducts from "../../hooks/useGetProducts";
import { createColumnHelper } from "@tanstack/react-table";
import { Product, ProductCategory } from "../../services/ProductService";
import { DataTable } from "../../utility/DataTable";

const ProductListScreen = () => {
  const { data } = useGetProducts();
  const productColumnHelper = createColumnHelper<Product>();
  const productColums = [
    productColumnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "Id",
    }),
    productColumnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "name",
    }),
    productColumnHelper.accessor("globalTradeItemNumber", {
      cell: (info) => info.getValue(),
      header: "global Trade Item Number",
    }),
    productColumnHelper.accessor("materialNumber", {
      cell: (info) => info.getValue(),
      header: "material Number",
    }),
    productColumnHelper.accessor("vendoer", {
      cell: (info) => info.getValue(),
      header: "vendor",
    }),
    productColumnHelper.accessor("productCategory", {
      cell: (info) =>
        info.getValue() === ProductCategory.Consumable
          ? "Consumable"
          : "Reagent",
      header: "product Category",
    }),
    productColumnHelper.accessor("isActive", {
      cell: (info) => (info.getValue() === true ? "Active" : "Not Active"),
      header: "Status",
    }),
  ];
  return <DataTable columns={productColums} data={data} />;
};

export default ProductListScreen;
