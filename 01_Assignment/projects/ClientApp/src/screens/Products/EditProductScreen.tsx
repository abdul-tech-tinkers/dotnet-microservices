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
import { useState } from "react";
import AppButton from "../../components/AppButton";
import AppCheckBox from "../../components/AppCheckBox";
import AppFormCheckBox from "../../components/forms/AppFormCheckBox";
import useEditProduct from "../../hooks/useEditProduct";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(8).label("Product Name"),
  globalTradeItemNumber: Yup.string().required().min(8).label("GTIN"),
  materialNumber: Yup.string().required().min(8).label("Material Number"),
  vendoer: Yup.string().required().min(8).label("Vendor"),
  productCategory: Yup.string().required().label("Category"),
  unitOfMeasure: Yup.string().required().label("Unit Of Measure"),
});

interface props {
  product: Product | undefined;
  onProductEditCompleted: () => void;
}
const EditProductScreen = ({ product, onProductEditCompleted }: props) => {
  const initialValues = product;
  console.log(product);
  const editProduct = useEditProduct(product.id);
  const [isProductEdited, setProductEdited] = useState(false);

  const handleSubmit = async (values, actions) => {
    const edit_product: Product = {
      id: product.id,
      name: values.name,
      globalTradeItemNumber: values.globalTradeItemNumber,
      materialNumber: values.materialNumber,
      productCategory: parseInt(values.productCategory),
      vendoer: values.vendoer,
      unitOfMeasure: values.unitOfMeasure,
      isActive: values.isActive,
      createdDate: product.createdDate,
      updatedDate: product.updatedDate,
    };
    try {
      editProduct.mutateAsync(edit_product);
      actions.resetForm(initialValues);
      setProductEdited(true);
      setTimeout(() => {
        setProductEdited(false);
        onProductEditCompleted();
      }, 2000);
    } catch (error) {
      console.log(`error handle submit error`);
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

      {isProductEdited && (
        <Alert status="success">
          <AlertIcon />
          Product Edit Completed.
        </Alert>
      )}

      {editProduct.error && (
        <Alert status="error">
          <AlertIcon />
          Error {editProduct.error?.response?.data}
          {editProduct?.error?.message}
        </Alert>
      )}

      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <AppFormInput
          icon={<MdOutlineInventory2 />}
          name="id"
          placeholder="id"
          type="text"
          isDisabled
        />
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
          isDisabled
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
          name="vendoer"
          placeholder="Vendor"
          type="text"
        />
        <AppFormInput
          icon={<MdOutlineInventory2 />}
          name="unitOfMeasure"
          placeholder="Unit Of Measure"
          type="text"
        />
        <AppFormCheckBox name="isActive" isChecked={initialValues.isActive}>
          Active Product
        </AppFormCheckBox>
        <AppSubmitButton>Update Product</AppSubmitButton>
        <AppButton
          color={colors.medium}
          onClick={() => onProductEditCompleted()}
        >
          Cancel
        </AppButton>
      </AppForm>
    </VStack>
  );
};

export default EditProductScreen;
