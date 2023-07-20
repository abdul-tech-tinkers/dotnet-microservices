import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import InventoryListScreen, { InventoryOption } from "./InventoryListScreen";
import CreateInventoryScreen from "./CreateInventoryScreen";
import { Inventory } from "../../services/InventoryService";
import { MdClose } from "react-icons/md";
import AppIconButton from "../../components/AppIconButton";
import AppText from "../../components/AppText";

const InventoryTabScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [isCheckOut, setCheckOut] = useState(false);
  const [editInventory, setEditInventory] = useState<Inventory>();
  const setEditInventoryData = (
    isEdit: boolean,
    isCheckOut: boolean,
    tabIndex: number,
    inventory: Inventory
  ) => {
    setEditInventory(inventory);
    setEdit(isEdit);
    setTabIndex(tabIndex);
    setCheckOut(isCheckOut);
  };

  const OnItemSelected = (
    inventory: Inventory,
    inventoryOption: InventoryOption
  ) => {
    console.log(inventory, inventoryOption);
    switch (inventoryOption) {
      case "ADD TO CART":
        setEditInventoryData(false, false, 0, {} as Inventory);
        break;
      case "DELETE":
        setEditInventoryData(false, false, 0, {} as Inventory);
        break;
      case "EDIT":
        setEditInventoryData(true, false, 2, inventory);
        break;
      case "CHECKOUT":
        setEditInventoryData(false, true, 2, inventory);
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
        <TabPanel>Edit Inventory</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default InventoryTabScreen;
