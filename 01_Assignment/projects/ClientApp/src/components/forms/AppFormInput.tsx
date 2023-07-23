import React from "react";
import { useFormikContext } from "formik";
import AppInput from "../AppInput";
import AppErrorMessage from "./AppErrorMessage";
import { Container, Flex, VStack } from "@chakra-ui/react";

interface props extends ComponentProps<"AppInput"> {
  name: string;
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
}
const AppFormInput = ({ name, icon, placeholder, type, ...rest }: props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <VStack marginY={2} alignItems="start">
      <AppInput
        width="100%"
        value={values[name]}
        onBlur={() => setFieldTouched(name)}
        onChange={(event) => setFieldValue(name, event.target.value)}
        icon={icon}
        placeholder={placeholder}
        type={type}
        {...rest}
      ></AppInput>
      <AppErrorMessage visible={touched[name]}>{errors[name]}</AppErrorMessage>
    </VStack>
  );
};

export default AppFormInput;
