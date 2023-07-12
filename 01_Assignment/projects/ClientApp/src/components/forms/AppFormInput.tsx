import React from "react";
import { useFormikContext } from "formik";
import AppInput from "../AppInput";
import AppErrorMessage from "./AppErrorMessage";
import { Container, Flex, VStack } from "@chakra-ui/react";

interface props {
  name: string;
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
}
const AppFormInput = ({ name, icon, placeholder, type }: props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <VStack marginY={5} alignItems="start">
      <AppInput
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={(event) => setFieldValue(name, event.target.value)}
        icon={icon}
        placeholder={placeholder}
        type={type}
      ></AppInput>
      <AppErrorMessage visible={touched[name]}>{errors[name]}</AppErrorMessage>
    </VStack>
  );
};

export default AppFormInput;
