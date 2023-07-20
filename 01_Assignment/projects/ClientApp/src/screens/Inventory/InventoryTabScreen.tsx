import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import InventoryListScreen from "./InventoryListScreen";
import CreateInventoryScreen from "./CreateInventoryScreen";

const InventoryTabScreen = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Inventory</Tab>
        <Tab>Create Inventory</Tab>
        <Tab>Edit Inventory</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <InventoryListScreen
            OnEditClicked={() => console.log("OnEditClicked")}
          />
        </TabPanel>
        <TabPanel>
          <CreateInventoryScreen />
        </TabPanel>
        <TabPanel>Edit Inventory</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default InventoryTabScreen;
