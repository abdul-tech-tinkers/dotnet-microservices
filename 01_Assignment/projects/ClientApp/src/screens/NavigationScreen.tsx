import {
  MdDashboard,
  MdMedicalServices,
  MdShoppingCart,
  MdInventory2,
} from "react-icons/md";
import { Center, Image, VStack } from "@chakra-ui/react";
import AppText from "../components/AppText";
import AppMenuItem from "../components/AppMenuItem";
import { useState } from "react";
import logo from "../assets/X0000_Siemens_Healthineers_logo.webp";

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

interface props {
  onSelected: (text: string) => void;
}
const NavigationScreen = ({ onSelected }: props) => {
  const [selectedMenu, setSelectedMenu] = useState("Dashboard");
  return (
    <VStack alignItems="flex-start">
      <Center>
        <Image src={logo} />
      </Center>
      {menuItems?.map((menuItem) => (
        <AppMenuItem
          key={menuItem.text}
          icon={menuItem.icon}
          text={menuItem.text}
          selected={selectedMenu === menuItem.text ? true : false}
          onSelected={(text) => {
            setSelectedMenu(text);
            onSelected(text);
          }}
        />
      ))}
    </VStack>
  );
};

export default NavigationScreen;
