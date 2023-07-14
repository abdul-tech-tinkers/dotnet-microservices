import { Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";
import React, { ComponentProps } from "react";
import * as colors from "../config/colors";

interface props extends ComponentProps<"Text"> {
  color: string;
  children: React.ReactNode;
}
const AppText = ({ children, ...rest }: props) => {
  return <Text {...rest}>{children}</Text>;
};

export default AppText;
