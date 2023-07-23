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
import { ProductCategory } from "../../services/ProductService";
import AppFormInput from "../../components/forms/AppFormInput";

export interface ProductFilter {
  name: string;
  GTIN: string;
  materialNumber: string;
  vendor: string;
  category: ProductCategory;
  isActive: boolean;
}
const initialValues: ProductFilter = {
  name: "",
  GTIN: "",
  materialNumber: "",
  vendor: "",
  isActive: false,
};

interface Props {
  onFilter: (filter: ProductFilter) => void;
}
const FilterProductScreen = ({ onFilter }: Props) => {
  const handleSubmit = (values, actions) => {
    const filterItems = {
      name: values.name,
      category: values.category,
      vendor: values.vendor,
      isActive: values.isActive,
      materialNumber: values.materialNumber,
      GTIN: values.GTIN,
    };
    onFilter(filterItems);
  };
  return (
    <Accordion allowToggle w="100vh">
      <AccordionItem>
        <h2>
          <AccordionButton bg="gray.100">
            <Box as="span" flex="1" textAlign="left">
              Filter Products
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel py={4}>
          <AppForm initialValues={initialValues} onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={10}>
              <AppFormInput
                name="name"
                placeholder="name"
                icon={<MdTextFormat />}
              />
              <AppFormInput
                name="GTIN"
                placeholder="GTIN"
                icon={<MdTextFormat />}
              />
              <AppFormInput
                name="materialNumber"
                placeholder="Material Number"
                icon={<MdTextFormat />}
              />
              <AppFormInput
                name="vendor"
                placeholder="Vendor"
                icon={<MdTextFormat />}
              />
              <AppSelect
                name="category"
                header="Select Product Category"
                options={[
                  {
                    label: "Consumable",
                    value: ProductCategory.Consumable.toString(),
                  },
                  {
                    label: "Reagents",
                    value: ProductCategory.Reagent.toString(),
                  },
                ]}
              />
              <AppFormCheckBox
                name="isActive"
                isChecked={initialValues.isActive}
              >
                Is Active
              </AppFormCheckBox>

              <AppSubmitButton>Filter</AppSubmitButton>
            </SimpleGrid>
          </AppForm>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default FilterProductScreen;
