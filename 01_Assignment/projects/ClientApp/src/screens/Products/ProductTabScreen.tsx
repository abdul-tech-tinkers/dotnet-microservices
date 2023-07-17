import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import ProductListScreen from "./ProductListScreen";
import AppText from "../../components/AppText";

const ProductTabScreen = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>
          <AppText>Products</AppText>
        </Tab>
        <Tab>New Product</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProductListScreen />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProductTabScreen;
