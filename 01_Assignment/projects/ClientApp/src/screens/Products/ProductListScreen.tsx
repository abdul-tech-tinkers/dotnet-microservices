import useGetProducts from "../../hooks/useGetProducts";
import { createColumnHelper } from "@tanstack/react-table";
import { Product, ProductCategory } from "../../services/ProductService";
import { DataTable } from "../../utility/DataTable";
import AppButton from "../../components/AppButton";
import * as colors from "../../config/colors";
import AppText from "../../components/AppText";
import { Spinner, VStack } from "@chakra-ui/react";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import useDeRegisterProduct from "../../hooks/useDeRegisterProduct";
import { useState } from "react";

interface props {
  OnEditClicked: (product: Product) => void;
}
const ProductListScreen = ({ OnEditClicked }: props) => {
  const { data, isLoading, error, refetch } = useGetProducts();
  const [productId, setProductId] = useState("");

  const deregister = useDeRegisterProduct(productId);
  const OnMarkInActive = async (id: string) => {
    console.log(`trying to deregister product ${id}`);
    try {
      setProductId(id);
      await deregister.mutateAsync();
      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

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
      cell: (info) => (
        <AppButton
          color={colors.medium}
          onClick={() => OnEditClicked(info.row.original)}
        >
          Edit
        </AppButton>
      ),
      header: "Edit",
    }),
    productColumnHelper.accessor("ActionDeRegister", {
      cell: (info) => (
        <AppButton
          onClick={() => OnMarkInActive(info.row.original.id)}
          isDisabled={!info.row.original.isActive}
        >
          make inactive
        </AppButton>
      ),
      header: "De Register",
    }),
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    const message = `Error Loading Products ${error}`;
    return <AppErrorMessage visible>{message}</AppErrorMessage>;
  }
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
