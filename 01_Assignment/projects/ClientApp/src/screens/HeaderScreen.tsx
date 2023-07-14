import { Box, Flex, IconButton } from "@chakra-ui/react";
import { MdShoppingCart, MdAccountCircle } from "react-icons/md";
import AppColorSwitch from "../components/AppColorSwitch";

const HeaderScreen = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box></Box>
      <Flex alignItems="center" mr={2} mt={2}>
        <IconButton
          aria-label="Shopping Cart"
          variant="unstyled"
          icon={<MdShoppingCart size={25} />}
        ></IconButton>
        <AppColorSwitch />
        <IconButton
          aria-label="Shopping Cart"
          variant="unstyled"
          icon={<MdAccountCircle size={25} />}
        ></IconButton>
      </Flex>
    </Flex>
  );
};

export default HeaderScreen;
