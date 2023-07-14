import { Box, HStack } from "@chakra-ui/react";
import React from "react";

import AppText from "./AppText";

interface props {
  icon?: React.ReactNode;
  text: string;
  selected: boolean;
  onSelected: (text: string) => void;
}

const AppMenuItem = ({ icon, text, selected = false, onSelected }: props) => {
  return (
    <HStack
      _hover={{ cursor: "pointer" }}
      onClick={() => onSelected(text)}
      w="100vh"
      py={2}
      bg={selected === true ? "yellow.600" : "transparent"}
    >
      <Box>{icon}</Box>
      <Box>
        <AppText>{text}</AppText>
      </Box>
    </HStack>
  );
};

export default AppMenuItem;
