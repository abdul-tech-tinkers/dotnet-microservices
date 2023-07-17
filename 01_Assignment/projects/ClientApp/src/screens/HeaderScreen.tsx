import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { MdShoppingCart, MdAccountCircle, MdLogout } from "react-icons/md";
import AppColorSwitch from "../components/AppColorSwitch";
import AppText from "../components/AppText";

const HeaderScreen = () => {
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <AppText fontWeight="bold" px={2} fontSize="24px">
          Inventory Management
        </AppText>
      </Box>
      <Flex alignItems="center" mr={2} mt={2}>
        <IconButton
          aria-label="Shopping Cart"
          variant="unstyled"
          icon={<MdShoppingCart size={25} />}
        ></IconButton>

        <AppColorSwitch />

        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="accounts"
            variant="unstyled"
            icon={<MdAccountCircle size={25} />}
          ></MenuButton>
          <MenuList>
            <MenuItem>Lab Manager</MenuItem>
            <MenuItem icon={<MdLogout />}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default HeaderScreen;
