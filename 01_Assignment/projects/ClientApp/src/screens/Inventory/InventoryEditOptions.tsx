import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { BiDotsVertical } from "react-icons/bi";
import {
  MdDelete,
  MdEdit,
  MdInventory2,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { InventoryOption } from "./InventoryListScreen";

interface Props {
  OnMenuItemSelected: (inventoryOption: InventoryOption) => void;
}

const InventoryEditOptions = ({ OnMenuItemSelected }: Props) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BiDotsVertical />}
        variant="outline"
      />
      <MenuList>
        <MenuItem
          icon={<MdOutlineShoppingCart size={18} />}
          onClick={() => OnMenuItemSelected("ADDTOCART")}
        >
          Add to Cart
        </MenuItem>
        <MenuItem
          icon={<MdEdit size={18} />}
          onClick={() => OnMenuItemSelected("EDIT")}
        >
          Edit
        </MenuItem>
        <MenuItem
          icon={<MdInventory2 size={18} />}
          onClick={() => OnMenuItemSelected("CHECKOUT")}
        >
          Check Out
        </MenuItem>
        <MenuItem
          icon={<MdDelete size={18} />}
          onClick={() => OnMenuItemSelected("DELETE")}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default InventoryEditOptions;
