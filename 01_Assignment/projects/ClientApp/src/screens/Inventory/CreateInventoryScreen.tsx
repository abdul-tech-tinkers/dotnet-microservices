import { VStack, Alert, AlertIcon } from "@chakra-ui/react";
import { MdInventory, MdOutlineInventory2 } from "react-icons/md";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import * as colors from "../../config/colors";
import AppForm from "../../components/forms/AppForm";
import AppFormInput from "../../components/forms/AppFormInput";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import { Inventory } from "../../services/InventoryService";
import AppSelect from "../../components/forms/AppSelect";
//import useCreateInventory from "../../hooks/useCreateInventory";
import { useState } from "react";

interface addInventory {
  serializedGlobalTradeItemNumber: string;
  lot: string;
  expirationDate: Date;
  productId: string;
}

const initialValues: addInventory = {
  serializedGlobalTradeItemNumber: "",
  lot: "",
  expirationDate: new Date(),
  productId: "",
};

const validationSchema = Yup.object().shape({
  globalTradeItemNumber: Yup.string().required().min(8).label("SGTIN"),
  lot: Yup.string().required().label("Lot"),
  expirationDate: Yup.date()
    .required()
    .min(new Date())
    .label("Expiration Date"),
  productId: Yup.string().required().label("Product Id"),
});

interface props {
  onInventoryCreated: () => void;
}
const CreateInventoryScreen = ({ onInventoryCreated }: props) => {
  //const createInventory = useCreateInventory();
  const [isInventoryCreated, setInventoryCreated] = useState(false);

  //   const handleSubmit = async (values, actions) => {
  //     const Inventory: Inventory = {
  //       name: values.name,
  //       globalTradeItemNumber: values.globalTradeItemNumber,
  //       materialNumber: values.materialNumber,
  //       InventoryCategory: parseInt(values.InventoryCategory),
  //       vendoer: values.vendor,
  //       unitOfMeasure: values.unitOfMeasure,
  //     };
  //     try {
  //       await createInventory.mutateAsync(Inventory);
  //       actions.resetForm(initialValues);
  //       setInventoryCreated(true);
  //       setTimeout(() => {
  //         setInventoryCreated(false);
  //         onInventoryCreated();
  //       }, 3000);
  //     } catch (error) {
  //       console.log(`error handlesubmit error`);
  //     }
  //   };

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
        Create New Inventory
      </AppText>

      {isInventoryCreated && (
        <Alert status="success">
          <AlertIcon />
          New Inventory Created.
        </Alert>
      )}

      {/* {createInventory.error && (
        <Alert status="error">
          <AlertIcon />
          Error {createInventory.error?.response?.data}
          {createInventory?.error?.message}
        </Alert>
      )} */}

      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        //onSubmit={handleSubmit}
      >
        <AppFormInput
          icon={<MdInventory />}
          name="serializedGlobalTradeItemNumber"
          placeholder="S GTIN"
          type="text"
        />
        <AppFormInput
          icon={<MdInventory />}
          name="lot"
          placeholder="lot"
          type="text"
        />
        <AppFormInput
          icon={<MdInventory />}
          name="expirationDate"
          placeholder="Expiration Date"
          type="text"
        />
        <AppFormInput
          icon={<MdInventory />}
          name="productId"
          placeholder="Product ID"
          type="text"
        />
        <AppSubmitButton>Create Inventory</AppSubmitButton>
      </AppForm>
    </VStack>
  );
};

export default CreateInventoryScreen;
