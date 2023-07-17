import React from "react";
import useGetProducts from "../../hooks/useGetProducts";
import { createColumnHelper } from "@tanstack/react-table";
import { Product, ProductCategory } from "../../services/ProductService";
import { DataTable } from "../../utility/DataTable";
import AppButton from "../../components/AppButton";
import * as colors from "../../config/colors";
import AppText from "../../components/AppText";
import { Container, Flex, VStack } from "@chakra-ui/react";

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

    productColumnHelper.accessor("ActionEdit", {
      cell: (info) => <AppButton color={colors.medium}>Edit</AppButton>,
      header: "Edit",
    }),
    productColumnHelper.accessor("ActionDeRegister", {
      cell: (info) => (
        <AppButton isDisabled={!info.row.original.isActive}>
          make inactive
        </AppButton>
      ),
      header: "De Register",
    }),
  ];
  return (
    <VStack alignItems="start">
      <AppText
        marginLeft={5}
        fontWeight="bold"
        color={colors.medium}
        fontSize="2xl"
      >
        Products
      </AppText>
      <DataTable columns={productColums} data={data} />
    </VStack>
  );
};

export default ProductListScreen;
