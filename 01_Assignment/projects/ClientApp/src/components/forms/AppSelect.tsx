import React from "react";
import { Select } from "@chakra-ui/react";
import { useFormikContext } from "formik";
import AppErrorMessage from "./AppErrorMessage";

interface props {
  name: string;
  header: string;
  options: SelectOptions[];
}
interface SelectOptions {
  value: string;
  label: string;
}

const AppSelect = ({
  name,
  options,
  initialValue = "",
  header = "Select an option",
}: props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  const onSelectChanged = async (event) => {
    setFieldTouched(name, true);
    await setFieldValue(name, event.target.value);
    console.log(event.target.value);
  };
  return (
    <>
      <Select
        name="selectOption"
        value={values[name]}
        onChange={onSelectChanged}
        width="28vh"
      >
        <option value="">{header}</option>
        {options?.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </Select>
      <AppErrorMessage visible={touched[name]}>{errors[name]}</AppErrorMessage>
    </>
  );
};

export default AppSelect;
