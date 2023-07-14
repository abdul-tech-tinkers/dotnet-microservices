import {
  MdDashboard,
  MdMedicalServices,
  MdShoppingCart,
  MdInventory2,
} from "react-icons/md";
import { Center, VStack } from "@chakra-ui/react";
import AppText from "../components/AppText";
import AppMenuItem from "../components/AppMenuItem";
import { useState } from "react";

interface menuItem {
  icon: React.ReactNode;
  text: string;
}
const menuItems: menuItem[] = [
  {
    icon: <MdDashboard />,
    text: "Dashboard",
  },
  {
    icon: <MdMedicalServices />,
    text: "Products",
  },
  {
    icon: <MdInventory2 />,
    text: "Inventory",
  },
  {
    icon: <MdShoppingCart />,
    text: "Cart Items",
  },
];
const NavigationScreen = () => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  return (
    <VStack marginY={5} paddingLeft={2} alignItems="flex-start">
      <Center>
        <AppText fontStyle="bold" fontSize="24px">
          Inventory Management
        </AppText>
      </Center>
      {menuItems?.map((menuItem) => (
        <AppMenuItem
          icon={menuItem.icon}
          text={menuItem.text}
          selected={selectedMenu === menuItem.text ? true : false}
          onSelected={(text) => setSelectedMenu(text)}
        />
      ))}
    </VStack>
  );
};

export default NavigationScreen;
