import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import InventoryListScreen from "./InventoryListScreen";

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
          <InventoryListScreen />
        </TabPanel>
        <TabPanel>Create Inventory</TabPanel>
        <TabPanel>Edit Inventory</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default InventoryTabScreen;
