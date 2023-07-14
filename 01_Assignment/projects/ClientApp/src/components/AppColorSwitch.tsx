import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const AppColorSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Color Mode"
      variant="unstyled"
      onClick={toggleColorMode}
      icon={
        colorMode == "dark" ? (
          <MdLightMode size={25} />
        ) : (
          <MdDarkMode size={25} />
        )
      }
    ></IconButton>
  );
};

export default AppColorSwitch;
