import { createColumnHelper } from "@tanstack/react-table";
import { CheckoutReason, Inventory } from "../../services/InventoryService";
import { DataTable } from "../../utility/DataTable";
import { useState } from "react";
import * as colors from "../../config/colors";
import AppText from "../../components/AppText";
import { Alert, AlertIcon, Spinner, VStack } from "@chakra-ui/react";
import useGetInventories from "../../hooks/useGetInventories";
import moment from "moment";

import InventoryEditOptions from "./InventoryEditOptions";
import FilterInventoryScreen, {
  InventoryFilter,
} from "./FilterInventoryScreen";
import { InventoryFilterFunc } from "../../utility/InventoryFilter";
interface props {
  OnItemSelected: (
    Inventory: Inventory,
    inventoryOption: InventoryOption
  ) => void;
}
export type InventoryOption = "ADDTOCART" | "EDIT" | "DELETE" | "CHECKOUT";
const InventoryListScreen = ({ OnItemSelected }: props) => {
  const { data, isLoading, error } = useGetInventories();
  const [inventoryFilter, setInventoryFilter] = useState<InventoryFilter>(
    {} as InventoryFilter
  );

  const getDate = (date: Date) => {
    return moment(date).format("YYYY-MM-DD");
  };
  const InventoryColumnHelper = createColumnHelper<Inventory>();
  const InventoryColumns = [
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
    InventoryColumnHelper.accessor("Options", {
      cell: (info) => (
        <InventoryEditOptions
          OnMenuItemSelected={(option) =>
            OnItemSelected(info.row.original, option)
          }
        />
      ),
      header: "Options",
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
      <FilterInventoryScreen
        onFilter={(filter) => {
          setInventoryFilter(filter);
        }}
      />
      <DataTable
        columns={InventoryColumns}
        data={InventoryFilterFunc(data, inventoryFilter)}
      />
    </VStack>
  );
};

export default InventoryListScreen;
