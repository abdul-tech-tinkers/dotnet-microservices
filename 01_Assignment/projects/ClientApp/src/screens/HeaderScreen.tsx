import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import { MdShoppingCart, MdAccountCircle, MdLogout } from "react-icons/md";
import AppColorSwitch from "../components/AppColorSwitch";
import AppText from "../components/AppText";
import AuthStorage from "../services/auth/AuthStorage";
import AuthService from "../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import AppIconButton from "../components/AppIconButton";
import useUserStore from "../stores/UserStore";

const HeaderScreen = () => {
  const navigate = useNavigate();
  const { name, type } = useUserStore();
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <AppText fontWeight="bold" px={2} fontSize="24px">
          Inventory Management
        </AppText>
      </Box>
      <Flex alignItems="center" mr={2} mt={2}>
        <AppIconButton
          aria_label="Shopping Cart"
          icon={<MdShoppingCart size={25} />}
        />

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
            <MenuItem
              icon={<MdLogout />}
              onClick={() => {
                AuthService().logOut;
                navigate("/");
              }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
        <VStack justify="flex-start" alignItems="flex-start">
          <AppText fontWeight="bold">{name}</AppText>
          <AppText fontSize="xs">User Type: {type}</AppText>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default HeaderScreen;
