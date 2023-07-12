import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { ComponentProps } from "react";

interface props extends ComponentProps<"Input"> {
  icon?: React.ReactNode;
  placeholder: string;
  type: string;
}
const AppInput = ({
  placeholder,
  type = "text",
  icon = null,
  ...rest
}: props) => {
  return (
    <InputGroup marginY={5} borderRadius={20}>
      {icon && <InputLeftElement>{icon}</InputLeftElement>}
      <Input type={type} placeholder={placeholder} size="md" {...rest} />
    </InputGroup>
  );
};

export default AppInput;
