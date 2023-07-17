import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import React from "react";
import ProductListScreen from "./ProductListScreen";
import AppText from "../../components/AppText";
import CreateProductScreen from "./CreateProductScreen";

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
          <CreateProductScreen />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProductTabScreen;
