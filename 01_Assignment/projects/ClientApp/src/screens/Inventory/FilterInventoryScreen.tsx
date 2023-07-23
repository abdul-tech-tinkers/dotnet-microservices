import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import AppForm from "../../components/forms/AppForm";
import { SimpleGrid } from "@chakra-ui/react";
import { MdTextFormat } from "react-icons/md";
import AppSubmitButton from "../../components/forms/AppSubmitButton";
import AppFormCheckBox from "../../components/forms/AppFormCheckBox";
import AppSelect from "../../components/forms/AppSelect";
import AppFormInput from "../../components/forms/AppFormInput";
import { CheckoutReason } from "../../services/InventoryService";
import AppFormCalendar from "../../components/forms/AppFormCalendar";

export interface InventoryFilter {
  lot: string;
  serializedGlobalTradeItemNumber: string;
  productId: string;
  reasonForCheckout: CheckoutReason;
}
const initialValues: InventoryFilter = {} as InventoryFilter;

interface Props {
  onFilter: (filter: InventoryFilter) => void;
}
const FilterInventoryScreen = ({ onFilter }: Props) => {
  const handleSubmit = (values, actions) => {
    const filterItems = {
      lot: values.lot,
      serializedGlobalTradeItemNumber: values.serializedGlobalTradeItemNumber,
      productId: values.productId,
      reasonForCheckout: values.reasonForCheckout,
    };
    console.log(filterItems);
    onFilter(filterItems);
  };
  return (
    <Accordion allowToggle w="100vh">
      <AccordionItem>
        <h2>
          <AccordionButton bg="gray.100">
            <Box as="span" flex="1" textAlign="left">
              Filter Inventories
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel py={4}>
          <AppForm initialValues={initialValues} onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={10}>
              <AppFormInput
                name="lot"
                placeholder="lot"
                icon={<MdTextFormat />}
              />
              <AppFormInput
                name="SGTIN"
                placeholder="SGTIN"
                icon={<MdTextFormat />}
              />
              <AppFormInput
                name="productId"
                placeholder="productId"
                icon={<MdTextFormat />}
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
                  {
                    label: "Expired",
                    value: CheckoutReason.Expired.toString(),
                  },
                  {
                    label: "Leakage",
                    value: CheckoutReason.Leakage.toString(),
                  },
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

              <AppSubmitButton>Filter</AppSubmitButton>
            </SimpleGrid>
          </AppForm>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterInventoryScreen;
