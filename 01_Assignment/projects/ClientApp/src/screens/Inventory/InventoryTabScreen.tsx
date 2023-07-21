import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import InventoryListScreen, { InventoryOption } from "./InventoryListScreen";
import CreateInventoryScreen from "./CreateInventoryScreen";
import { Inventory } from "../../services/InventoryService";
import { MdClose } from "react-icons/md";
import AppIconButton from "../../components/AppIconButton";
import AppText from "../../components/AppText";
import EditInventoryScreen from "./EditInventoryScreen";
import CheckoutInventory from "./CheckoutInventory";
import useDeleteInventory from "../../hooks/useDeleteInventory";

const InventoryTabScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [isCheckOut, setCheckOut] = useState(false);
  const [editInventory, setEditInventory] = useState<Inventory>();
  const deleteInventory = useDeleteInventory();
  const setEditInventoryData = (
    isEdit: boolean,
    isCheckOut: boolean,
    tabIndex: number,
    inventory: Inventory | undefined
  ) => {
    setEditInventory(inventory);
    setEdit(isEdit);
    setTabIndex(tabIndex);
    setCheckOut(isCheckOut);
  };

  const DeleteInventoryItem = async () => {
    const response = confirm(
      "Are you sure you want to delete inventory " +
        editInventory?.serializedGlobalTradeItemNumber
    );
    if (response) {
      await deleteInventory.mutateAsync(editInventory?.id);
    }
  };
  const OnItemSelected = async (
    inventory: Inventory,
    inventoryOption: InventoryOption
  ) => {
    console.log(inventory, inventoryOption);
    switch (inventoryOption) {
      case "ADD TO CART":
        setEditInventoryData(false, false, 0, inventory);
        break;
      case "DELETE":
        setEditInventoryData(false, false, 0, inventory);
        await DeleteInventoryItem();
        break;
      case "EDIT":
        setEditInventoryData(true, false, 2, inventory);
        break;
      case "CHECKOUT":
        setEditInventoryData(false, true, 3, inventory);
        break;
    }
  };

  return (
    <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>Inventory</Tab>
        <Tab>Create Inventory</Tab>
        {isCheckOut && (
          <Tab>
            <>
              <AppText>Checkout Inventory</AppText>
              <AppIconButton
                aria_label="close"
                icon={<MdClose />}
                onClick={() => {
                  setEditInventoryData(false, false, 0, {} as Inventory);
                }}
              />
            </>
          </Tab>
        )}
        {isEdit && (
          <Tab>
            <>
              <AppText>Edit Inventory</AppText>
              <AppIconButton
                aria_label="close"
                icon={<MdClose />}
                onClick={() => {
                  setEditInventoryData(false, false, 0, {} as Inventory);
                }}
              />
            </>
          </Tab>
        )}
      </TabList>
      <TabPanels>
        <TabPanel>
          <InventoryListScreen OnItemSelected={OnItemSelected} />
        </TabPanel>
        <TabPanel>
          <CreateInventoryScreen
            onInventoryCreated={() =>
              setEditInventoryData(false, false, 0, {} as Inventory)
            }
          />
        </TabPanel>
        <TabPanel>
          <EditInventoryScreen
            inventory={editInventory}
            onInventoryUpdated={() =>
              setEditInventoryData(false, false, 0, {} as Inventory)
            }
          />
        </TabPanel>
        <TabPanel>
          <CheckoutInventory
            inventory={editInventory}
            onInventoryUpdated={() =>
              setEditInventoryData(false, false, 0, {} as Inventory)
            }
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default InventoryTabScreen;
