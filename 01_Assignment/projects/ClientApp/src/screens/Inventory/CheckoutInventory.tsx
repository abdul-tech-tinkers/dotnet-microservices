import { useState } from "react";
import AppForm from "../../components/forms/AppForm";
import { CheckoutReason, Inventory } from "../../services/InventoryService";
import AppSelect from "../../components/forms/AppSelect";
import AppFormInput from "../../components/forms/AppFormInput";
import { MdInventory } from "react-icons/md";
import * as Yup from "yup";
import { Alert, AlertIcon, VStack } from "@chakra-ui/react";
import * as colors from "../../config/colors";
import AppText from "../../components/AppText";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import AppButton from "../../components/AppButton";
import useCheckoutInventory from "../../hooks/useCheckoutInventory";
interface Props {
  inventory: Inventory;
  onInventoryUpdated: () => void;
}

const validationSchema = Yup.object().shape({
  reasonForCheckout: Yup.number().required().label("Reason For checkout"),
});
const CheckoutInventory = ({ inventory, onInventoryUpdated }: Props) => {
  if (!inventory) return;

  const updateInventory = useCheckoutInventory();
  const [isInventoryUpdated, setInventoryUpdated] = useState(false);

  const handleSubmit = async (values, actions) => {
    const Inventory_toUpdate: Inventory = {
      serializedGlobalTradeItemNumber: values.serializedGlobalTradeItemNumber,
      reasonForCheckout: parseInt(values.reasonForCheckout),
    };
    try {
      await updateInventory.mutateAsync(Inventory_toUpdate);
      actions.resetForm(inventory);
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
        Check Out Inventory {inventory?.serializedGlobalTradeItemNumber}
      </AppText>
      <AppForm
        validationSchema={validationSchema}
        initialValues={inventory}
        onSubmit={handleSubmit}
      >
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
        <AppSelect
          name="reasonForCheckout"
          header="Select Reason For Checkout"
          options={[
            {
              label: "None",
              value: CheckoutReason.None.toString(),
            },
            {
              label: "Consumption",
              value: CheckoutReason.Consumption.toString(),
            },
            { label: "Expired", value: CheckoutReason.Expired.toString() },
            { label: "Leakage", value: CheckoutReason.Leakage.toString() },
            {
              label: "LostAndNotFound",
              value: CheckoutReason.LostAndNotFound.toString(),
            },
            {
              label: "RemovedFromSystem",
              value: CheckoutReason.RemovedFromSystem.toString(),
            },
          ]}
        />

        <AppSubmitButton>Checkout Inventory</AppSubmitButton>
        <AppButton color={colors.medium} onClick={() => onInventoryUpdated()}>
          Cancel
        </AppButton>
      </AppForm>
    </VStack>
  );
};

export default CheckoutInventory;
