import {
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  IconButton,
} from "@chakra-ui/react";
import ProductListScreen from "./ProductListScreen";
import AppText from "../../components/AppText";
import CreateProductScreen from "./CreateProductScreen";
import { useEffect, useState } from "react";
import { Product } from "../../services/ProductService";
import EditProductScreen from "./EditProductScreen";
import { MdClose } from "react-icons/md";
import AppIconButton from "../../components/AppIconButton";
import useUserStore from "../../stores/UserStore";

const ProductTabScreen = () => {
  const { type } = useUserStore();
  const [tabIndex, setTabIndex] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [editProduct, setEditProduct] = useState<Product>();

  const setEditProductData = (
    isEdit: boolean,
    tabIndex: number,
    product: Product
  ) => {
    setEditProduct(product);
    setEdit(isEdit);
    setTabIndex(tabIndex);
  };
  return (
    <Tabs index={tabIndex} onChange={(index) => setTabIndex(index)}>
      <TabList>
        <Tab>
          <AppText>Products</AppText>
        </Tab>
        <Tab isDisabled={type !== "G0"}>New Product</Tab>
        {isEdit && (
          <Tab isDisabled={type !== "G0"}>
            <AppText>Edit Product</AppText>
            <AppIconButton
              aria_label="close"
              icon={<MdClose />}
              onClick={() => {
                setEditProductData(false, 0, {} as Product);
              }}
            />
          </Tab>
        )}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProductListScreen
            OnEditClicked={(product) => {
              setEditProductData(true, 2, product);
            }}
          />
        </TabPanel>
        <TabPanel>
          <CreateProductScreen onProductCreated={() => setTabIndex(0)} />
        </TabPanel>
        <TabPanel>
          {isEdit && (
            <EditProductScreen
              product={editProduct}
              onProductEditCompleted={() => {
                setEditProductData(false, 0, {} as Product);
              }}
            />
          )}
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProductTabScreen;
