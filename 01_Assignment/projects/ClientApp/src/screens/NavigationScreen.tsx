import {
  MdDashboard,
  MdMedicalServices,
  MdShoppingCart,
  MdInventory2,
} from "react-icons/md";
import { Center, Image, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AppMenuItem from "../components/AppMenuItem";
import { useState } from "react";
import logo from "../assets/X0000_Siemens_Healthineers_logo.webp";

interface menuItem {
  icon: React.ReactNode;
  text: string;
  link: string;
}
const menuItems: menuItem[] = [
  {
    icon: <MdDashboard />,
    text: "Dashboard",
    link: "",
  },
  {
    icon: <MdMedicalServices />,
    text: "Products",
    link: "products",
  },
  {
    icon: <MdInventory2 />,
    text: "Inventory",
    link: "inventory",
  },
  {
    icon: <MdShoppingCart />,
    text: "Cart Items",
    link: "carts",
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
        <Link to={menuItem.link}>
          {" "}
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
        </Link>
      ))}
    </VStack>
  );
};

export default NavigationScreen;
