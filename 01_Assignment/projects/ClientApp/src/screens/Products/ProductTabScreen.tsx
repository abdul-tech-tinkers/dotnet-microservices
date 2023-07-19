import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@chakra-ui/react";
import ProductListScreen from "./ProductListScreen";
import AppText from "../../components/AppText";
import CreateProductScreen from "./CreateProductScreen";
import { useState } from "react";
import { Product } from "../../services/ProductService";

const ProductTabScreen = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>();
  return (
    <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>
          <AppText>Products</AppText>
        </Tab>
        <Tab>New Product</Tab>
        {isEdit && (
          <Tab>
            <AppText>Edit Product</AppText>
          </Tab>
        )}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProductListScreen
            OnEditClicked={(product) => {
              setEditProduct(product);
              setEdit(true);
              setTabIndex(2);
            }}
          />
        </TabPanel>
        <TabPanel>
          <CreateProductScreen onProductCreated={() => setTabIndex(0)} />
        </TabPanel>
        <TabPanel>
          {isEdit && (
            <CreateProductScreen onProductCreated={() => setTabIndex(0)} />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProductTabScreen;
