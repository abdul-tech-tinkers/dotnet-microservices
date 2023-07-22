import { createColumnHelper } from "@tanstack/react-table";

import { DataTable } from "../../utility/DataTable";

import * as colors from "../../config/colors";
import AppText from "../../components/AppText";
import { Alert, AlertIcon, Spinner, VStack } from "@chakra-ui/react";

import { useState } from "react";

import { Cart } from "../../services/CartService";
import useGetCarts from "../../hooks/useGetCarts";
import AppButton from "../../components/AppButton";
import useDeleteCartItem from "../../hooks/useDeleteCartItem";
import useDeleteAllCartItems from "../../hooks/useDeleteAllCartItems";

const CartsScreen = () => {
  const { data, isLoading, error } = useGetCarts();

  const removeCartItem = useDeleteCartItem();
  const removeAllCartItems = useDeleteAllCartItems();
  const [isRemoved, setIsRemoved] = useState(false);

  const deleteAllCartItems = async () => {
    await removeAllCartItems.mutateAsync();
    setIsRemoved(true);
    setTimeout(() => {
      setIsRemoved(false);
    }, 800);
  };
  const deleteCartItem = async (cart: Cart) => {
    await removeCartItem.mutateAsync(cart?.serializedGlobalTradeItemNumber);
    setIsRemoved(true);
    setTimeout(() => {
      setIsRemoved(false);
    }, 800);
  };

  const productColumnHelper = createColumnHelper<Cart>();
  const cartColumns = [
    productColumnHelper.accessor("serializedGlobalTradeItemNumber", {
      cell: (info) => info.getValue(),
      header: "SGTIN",
    }),
    productColumnHelper.accessor("productName", {
      cell: (info) => info.getValue(),
      header: "product Name",
    }),
    productColumnHelper.accessor("vendorName", {
      cell: (info) => info.getValue(),
      header: "vendor Name",
    }),
    productColumnHelper.accessor("quantity", {
      cell: (info) => info.getValue(),
      header: "quantity",
    }),
    productColumnHelper.accessor("delete", {
      cell: (info) => (
        <AppButton onClick={() => deleteCartItem(info.row.original)}>
          Delete
        </AppButton>
      ),
      header: "Delete",
    }),
  ];

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    const message = `Error Loading Carts ${error}`;
    return (
      <Alert status="error">
        <AlertIcon />
        {message}
      </Alert>
    );
  }
  if (data.length === 0) {
    return (
      <AppText
        marginLeft={5}
        fontWeight="bold"
        color={colors.medium}
        fontSize="2xl"
      >
        Cart is Empty
      </AppText>
    );
  }
  return (
    <VStack alignItems="start">
      <AppText
        marginLeft={5}
        fontWeight="bold"
        color={colors.medium}
        fontSize="2xl"
      >
        Cart Items
      </AppText>
      <AppButton
        marginLeft={5}
        color={colors.primary}
        width="200px"
        onClick={() => deleteAllCartItems()}
      >
        Empty Cart
      </AppButton>
      {isRemoved && (
        <Alert status="success">
          <AlertIcon />
          Cart Item Removed
        </Alert>
      )}

      <DataTable columns={cartColumns} data={data} />
    </VStack>
  );
};

export default CartsScreen;
