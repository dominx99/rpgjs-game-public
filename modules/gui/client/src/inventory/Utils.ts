import { BackpackItem, Slot } from "rpgjs-inventory";
import { BackpackItems } from "rpgjs-inventory/server/src/domain/BackpackItems";

export const getInventoryBackpackItemBySlot = (inventory: any, slot: Slot): BackpackItem | null => {
    const backpack: any = getInventoryBackpack(inventory, slot.backpack)

    return Object.values(backpack.items as BackpackItems).find((item: BackpackItem) => item?.slot === slot.slot) || null;
}

export const getInventoryBackpack = (inventory: any, backpackId: string) => {
    return Object.values(inventory.backpacks).find((backpack: any) => backpack?.id === backpackId)
}
