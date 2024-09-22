import { Slot } from "rpgjs-inventory";

export interface InventoryItemContract {
    item: ItemContract,
    nb: number,
}

export interface InventorySlotContract extends InventoryItemContract {
    slot: Slot,
}

export interface ItemContract {
    id: string;
    name?: string;
    description?: string;
    price?: number;
    consumable?: boolean;
    displayName?: string,
    equippable?: boolean,
    icon?: string,
    graphic?: string,
    type?: string,
    atk?: number,
    pdef?: number,
    level?: number,
    requiredLevelToEquip?: number,
    magnificence?: number,
}
