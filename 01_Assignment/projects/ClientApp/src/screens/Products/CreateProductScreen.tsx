import { VStack, Select } from "@chakra-ui/react";
import { MdOutlineInventory2 } from "react-icons/md";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import * as colors from "../../config/colors";
import AppForm from "../../components/forms/AppForm";
import AppFormInput from "../../components/forms/AppFormInput";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import { ProductCategory } from "../../services/ProductService";
import AppSelect from "../../components/forms/AppSelect";

interface addProduct {
  name: string;
  globalTradeItemNumber: string;
  materialNumber: string;
  vendor: string;
  productCategory: string;
  unitOfMeasure: string;
}

const CreateProductScreen = () => {
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
    globalTradeItemNumber: Yup.string()
      .required()
      .min(8)
      .label("Product Global Trade Item Number"),
    materialNumber: Yup.string()
      .required()
      .min(8)
      .label("Product Material Number"),
    vendor: Yup.string().required().min(8).label("Product Vendor"),
    productCategory: Yup.string().required().label("Product Category"),
  });

  return (
    <VStack alignItems="start" width="50vh">
      <AppText
        marginLeft={5}
        fontWeight="bold"
        color={colors.medium}
        fontSize="2xl"
      >
        Create New Product
      </AppText>
      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => console.log("")}
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
            { label: "Consumable", value: "0" },
            { label: "Reagents", value: "1" },
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
