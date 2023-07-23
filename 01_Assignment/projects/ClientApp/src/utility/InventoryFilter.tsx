import { InventoryFilter } from "../screens/Inventory/FilterInventoryScreen";
import { Inventory } from "../services/InventoryService";

export const InventoryFilterFunc = (
  inventory: Inventory[],
  filter: InventoryFilter | undefined
) => {
  if (!filter) return inventory;
  let filteredInventory: Inventory[] = inventory;

  console.log(filter);
  if (filter.lot) {
    filteredInventory = filteredInventory.filter((p) =>
      p.lot.toLocaleLowerCase().includes(filter.lot.toLocaleLowerCase())
    );
  }

  if (filter.serializedGlobalTradeItemNumber) {
    filteredInventory = filteredInventory.filter((p) =>
      p.serializedGlobalTradeItemNumber
        .toLocaleLowerCase()
        .includes(filter.serializedGlobalTradeItemNumber.toLocaleLowerCase())
    );
  }

  if (filter.reasonForCheckout) {
    filteredInventory = filteredInventory.filter(
      (p) =>
        parseInt(p.reasonForCheckout.toString()) ===
        parseInt(filter.reasonForCheckout.toString())
    );
  }

  if (filter.productId) {
    filteredInventory = filteredInventory.filter((p) =>
      p.productId
        .toLocaleLowerCase()
        .includes(filter.productId.toLocaleLowerCase())
    );
  }

  return filteredInventory;
};
