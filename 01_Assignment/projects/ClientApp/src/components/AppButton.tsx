import { Button } from "@chakra-ui/react";
import React, { ComponentProps } from "react";
import * as colors from "../config/colors";
interface props extends ComponentProps<"Button"> {
  children: React.ReactNode;
  color: string;
  width: string;
}

const AppButton = ({
  children,
  color = colors.primary,
  width = "100%",
  ...rest
}: props) => {
  return (
    <Button
      width={width}
      borderRadius={20}
      size="md"
      variant="solid"
      color="white"
      textTransform="uppercase"
      marginY={2}
      {...rest}
      bg={color}
    >
      {children}
    </Button>
  );
};

export default AppButton;
