import { VStack, Select, Alert, AlertIcon } from "@chakra-ui/react";
import { MdOutlineInventory2 } from "react-icons/md";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import * as colors from "../../config/colors";
import AppForm from "../../components/forms/AppForm";
import AppFormInput from "../../components/forms/AppFormInput";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import { Product, ProductCategory } from "../../services/ProductService";
import AppSelect from "../../components/forms/AppSelect";
import useCreateProduct from "../../hooks/useCreateProduct";
import AppErrorMessage from "../../components/forms/AppErrorMessage";
import OkAlert from "../../components/alerts/OkAlert";
import { useState } from "react";
interface addProduct {
  name: string;
  globalTradeItemNumber: string;
  materialNumber: string;
  vendor: string;
  productCategory: string;
  unitOfMeasure: string;
}

const initialValues: addProduct = {
  name: "",
  globalTradeItemNumber: "",
  materialNumber: "",
  vendor: "",
  unitOfMeasure: "",
  productCategory: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(8).label("Product Name"),
  globalTradeItemNumber: Yup.string().required().min(8).label("GTIN"),
  materialNumber: Yup.string().required().min(8).label("Material Number"),
  vendor: Yup.string().required().min(8).label("Vendor"),
  productCategory: Yup.string().required().label("Category"),
  unitOfMeasure: Yup.string().required().label("Unit Of Measure"),
});

const CreateProductScreen = () => {
  const createProduct = useCreateProduct();
  const [isProductCreated, setProductCreated] = useState(false);

  const handleSubmit = async (values, actions) => {
    const product: Product = {
      name: values.name,
      globalTradeItemNumber: values.globalTradeItemNumber,
      materialNumber: values.materialNumber,
      productCategory: parseInt(values.productCategory),
      vendoer: values.vendor,
      unitOfMeasure: values.unitOfMeasure,
    };
    try {
      await createProduct.mutateAsync(product);
      actions.resetForm(initialValues);
      setProductCreated(true);
      setTimeout(() => {
        setProductCreated(false);
      }, 3000);
    } catch (error) {
      console.log(`error handlesubmit error`);
    }
  };

  return (
    <VStack
      alignItems="start"
      width="50vh"
      p={5}
      borderRadius={5}
      borderWidth={0.5}
      borderColor="gray.400"
    >
      <AppText fontWeight="bold" color={colors.medium} fontSize="2xl">
        Create New Product
      </AppText>

      {isProductCreated && (
        <Alert status="success">
          <AlertIcon />
          New Product Created.
        </Alert>
      )}

      {createProduct.error && (
        <Alert status="error">
          <AlertIcon />
          Error {createProduct.error?.response?.data}
        </Alert>
      )}

      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <AppFormInput
          icon={<MdOutlineInventory2 />}
          name="name"
          placeholder="Name"
          type="text"
        />
        <AppFormInput
          icon={<MdOutlineInventory2 />}
          name="globalTradeItemNumber"
          placeholder="GTIN"
          type="text"
        />
        <AppFormInput
          icon={<MdOutlineInventory2 />}
          name="materialNumber"
          placeholder="Material Number"
          type="text"
        />
        <AppSelect
          name="productCategory"
          header="Select Product Category"
          options={[
            {
              label: "Consumable",
              value: ProductCategory.Consumable.toString(),
            },
            { label: "Reagents", value: ProductCategory.Reagent.toString() },
          ]}
        />
        <AppFormInput
          icon={<MdOutlineInventory2 />}
          name="vendor"
          placeholder="Vendor"
          type="text"
        />
        <AppFormInput
          icon={<MdOutlineInventory2 />}
          name="unitOfMeasure"
          placeholder="Unit Of Measure"
          type="text"
        />
        <AppSubmitButton>Create Product</AppSubmitButton>
      </AppForm>
    </VStack>
  );
};

export default CreateProductScreen;
