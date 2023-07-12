import { Button } from "@chakra-ui/react";
import React, { ComponentProps } from "react";
import * as colors from "../config/colors";
interface props extends ComponentProps<"Button"> {
  children: React.ReactNode;
  color: string;
  width: string;
  onClick: () => void;
}

const AppButton = ({
  children,
  color = colors.primary,
  width = "100%",
  onClick,
  ...rest
}: props) => {
  return (
    <Button
      onClick={onClick}
      width={width}
      borderRadius={20}
      size="md"
      variant="solid"
      color="white"
      textTransform="uppercase"
      marginY={2}
      {...rest}
      bg={color}
      onKeyDown={(event) => {
        if (event.key == "Enter") {
          console.log("enter key pressed");
          onClick();
        }
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
