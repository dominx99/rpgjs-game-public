import { NativeInventoryItem, Slot } from "rpgjs-inventory";

export interface InventorySlot extends NativeInventoryItem {
    slot: Slot;
}

