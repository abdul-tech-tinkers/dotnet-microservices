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

import AuthService from "../services/auth/AuthService";
import { useNavigate } from "react-router-dom";
import AppIconButton from "../components/AppIconButton";
import useUserStore from "../stores/UserStore";

import { Link } from "react-router-dom";

const HeaderScreen = () => {
  const navigate = useNavigate();
  const authService = AuthService();
  const { name, type } = useUserStore();
  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Box>
        <AppText fontWeight="bold" px={2} fontSize="3xl">
          Inventory Management
        </AppText>
      </Box>
      <Flex alignItems="center" mr={2} mt={2}>
        <Flex align="center">
          <Link to="carts">
            <AppIconButton
              aria_label="Shopping Cart"
              icon={<MdShoppingCart size={25} />}
            />
          </Link>
          {/* <Box>
            {cartItemCount > 0 && (
              <AppText fontSize="sm" fontWeight="bold">
                {cartItemCount}
              </AppText>
            )}
          </Box> */}
        </Flex>

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
                authService.logOut();
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
