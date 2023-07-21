import { VStack, Alert, AlertIcon } from "@chakra-ui/react";
import { MdInventory } from "react-icons/md";
import * as Yup from "yup";

import AppText from "../../components/AppText";
import * as colors from "../../config/colors";
import AppForm from "../../components/forms/AppForm";
import AppFormInput from "../../components/forms/AppFormInput";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import { Inventory } from "../../services/InventoryService";
import { useState } from "react";
import useEditInventory from "../../hooks/useEditInventory";
import AppButton from "../../components/AppButton";

const validationSchema = Yup.object().shape({
  serializedGlobalTradeItemNumber: Yup.string()
    .required()
    .min(8)
    .label("SGTIN"),
  lot: Yup.string().required().label("Lot"),
  expirationDate: Yup.date()
    .required()
    .min(new Date())
    .label("Expiration Date"),
  productId: Yup.string().required().label("Product Id"),
});

interface props {
  inventory: Inventory;
  onInventoryUpdated: () => void;
}
const EditInventoryScreen = ({ inventory, onInventoryUpdated }: props) => {
  if (!inventory) return;
  const initialValues = inventory;
  const updateInventory = useEditInventory(inventory?.id?.toString());
  const [isInventoryUpdated, setInventoryUpdated] = useState(false);

  const handleSubmit = async (values, actions) => {
    const Inventory_toUpdate: Inventory = {
      id: inventory.id,
      serializedGlobalTradeItemNumber: values.serializedGlobalTradeItemNumber,
      lot: values.lot,
      expirationDate: new Date(values.expirationDate),
      productId: values.productId,
      checkInDate: inventory.checkInDate,
      checkOutDate: inventory.checkOutDate,
    };
    try {
      await updateInventory.mutateAsync(Inventory_toUpdate);
      actions.resetForm(initialValues);
      setInventoryUpdated(true);
      setTimeout(() => {
        setInventoryUpdated(false);
        onInventoryUpdated();
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
        Create New Inventory
      </AppText>

      {isInventoryUpdated && (
        <Alert status="success">
          <AlertIcon />
          Inventory Updated.
        </Alert>
      )}

      {updateInventory.error && (
        <Alert status="error">
          <AlertIcon />
          Error {updateInventory.error?.response?.data}
          {updateInventory?.error?.message}
        </Alert>
      )}

      <AppForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <AppFormInput
          icon={<MdInventory />}
          name="id"
          placeholder="id"
          type="text"
          isDisabled
        />

        <AppFormInput
          icon={<MdInventory />}
          name="serializedGlobalTradeItemNumber"
          placeholder="S GTIN"
          type="text"
          isDisabled
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
        <AppSubmitButton>Update Inventory</AppSubmitButton>
        <AppButton color={colors.medium} onClick={() => onInventoryUpdated()}>
          Cancel
        </AppButton>
      </AppForm>
    </VStack>
  );
};

export default EditInventoryScreen;
