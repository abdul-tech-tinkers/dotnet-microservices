import { createColumnHelper } from "@tanstack/react-table";
import { CheckoutReason, Inventory } from "../../services/InventoryService";
import { DataTable } from "../../utility/DataTable";
import AppButton from "../../components/AppButton";
import * as colors from "../../config/colors";
import AppText from "../../components/AppText";
import { Alert, AlertIcon, Spinner, VStack } from "@chakra-ui/react";
import { useState } from "react";
import useGetInventories from "../../hooks/useGetInventories";
import moment from "moment";
import AppIconButton from "../../components/AppIconButton";
import { MdOutlineShoppingCart, MdShoppingCart } from "react-icons/md";
interface props {
  OnEditClicked: (Inventory: Inventory) => void;
}
const InventoryListScreen = ({ OnEditClicked }: props) => {
  const { data, isLoading, error, refetch } = useGetInventories();
  //const [InventoryId, setInventoryId] = useState("");

  //const deregister = useDeRegisterInventory(InventoryId);
  //   const OnMarkInActive = async (id: string) => {
  //     console.log(`trying to deregister Inventory ${id}`);
  //     try {
  //       setInventoryId(id);
  //       await deregister.mutateAsync();
  //       await refetch();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const getDate = (date: Date) => {
    return moment(date).format("YYYY-MM-DD");
  };
  const InventoryColumnHelper = createColumnHelper<Inventory>();
  const InventoryColums = [
    InventoryColumnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "Id",
    }),
    InventoryColumnHelper.accessor("lot", {
      cell: (info) => info.getValue(),
      header: "lot",
    }),
    InventoryColumnHelper.accessor("serializedGlobalTradeItemNumber", {
      cell: (info) => info.getValue(),
      header: "Serialized Global Trade Item Number",
    }),
    InventoryColumnHelper.accessor("expirationDate", {
      cell: (info) => getDate(info.getValue()),
      header: "expiration Date",
    }),
    InventoryColumnHelper.accessor("reasonForCheckout", {
      cell: (info) => CheckoutReason[info.getValue()],
      header: "reason For Checkout",
    }),
    InventoryColumnHelper.accessor("checkInDate", {
      cell: (info) => getDate(info.getValue()),
      header: "checkIn Date",
    }),
    InventoryColumnHelper.accessor("checkOutDate", {
      cell: (info) => getDate(info.getValue()),
      header: "checkOut Date",
    }),
    InventoryColumnHelper.accessor("productId", {
      cell: (info) => info.getValue(),
      header: "Product Id",
    }),
    InventoryColumnHelper.accessor("AddToCart", {
      cell: (info) => (
        <AppIconButton
          color={colors.medium}
          icon={<MdOutlineShoppingCart size={30} />}
          onClick={() => {
            console.log("edit");
          }}
        ></AppIconButton>
      ),
      header: "Add To Cart",
    }),
    InventoryColumnHelper.accessor("EditCheckOut", {
      cell: (info) => (
        <AppButton
          color={colors.medium}
          onClick={() => {
            console.log("edit");
          }}
        >
          Check out
        </AppButton>
      ),
      header: "Check Out",
    }),
    InventoryColumnHelper.accessor("Delete", {
      cell: (info) => (
        <AppButton
          color={colors.danger}
          onClick={() => {
            console.log("Delete");
          }}
        >
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
    const message = `Error Loading inventories ${error}`;
    return (
      <Alert status="error">
        <AlertIcon />
        {message}
      </Alert>
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
        Inventories
      </AppText>
      <DataTable columns={InventoryColums} data={data} />
    </VStack>
  );
};

export default InventoryListScreen;
