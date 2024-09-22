import { Backpack, BackpackItem, NativeInventoryItem } from "rpgjs-inventory";
import { InventorySlot } from "../../../inventory-extension/src/interfaces/InventorySlot";
import { BackpackItems } from "rpgjs-inventory/server/src/domain/BackpackItems";

export class InventoryMapper {
    static mapItems(inventory: any, items: any): Array<InventorySlot | null> {
        if (!inventory || !items) return [];

        const itemsMap = {};
        Object.values(items as NativeInventoryItem[]).forEach((item) => {
            if (!item || !item.item || !item.item.id) {
                return;
            }

            itemsMap[item.item.id] = item;
        });

        const resultItems: Array<InventorySlot | null> = [];

        const mainBackpack: Backpack = inventory.backpacks[0];

        if (!mainBackpack || !mainBackpack.items) {
            return [];
        }

        Array.from({ length: mainBackpack.size }).forEach((val, key) => {
            const backpackItem = this.getBackpackItemBySlot(mainBackpack, key);

            if (!backpackItem) {
                resultItems.push(null);

                return;
            }

            const nativeItem = this.getNativeItemByItemId(items, backpackItem.itemId);

            if (!nativeItem) {
                resultItems.push(null);

                return;
            }

            resultItems.push({
                ...nativeItem,
                nb: backpackItem.nb,
                slot: {
                    slot: backpackItem.slot,
                    backpack: 'main',
                },
            });
        });

        return resultItems;
    }

    static mapEquipment(originalEquipment: { [key: string]: any } | null, inventoryEquipment: any): any {
        if (!inventoryEquipment || !originalEquipment) {
            return null;
        }

        const resultEquipment: any = {};

        Object.values(inventoryEquipment.items as any).forEach((item) => {
            Object.values(originalEquipment as any).forEach((originalItem) => {
                if (!originalItem || !item || originalItem.id !== item.id) {
                    return;
                }

                resultEquipment[item.type] = originalItem;
            })
        });

        return resultEquipment;
    }

    private static getBackpackItemBySlot(backpack: Backpack, slot: number): BackpackItem | undefined {
        return Object.values(backpack.items as BackpackItems).find((item: BackpackItem) => item?.slot === slot);
    }

    private static getNativeItemByItemId(items: any, itemId: string): NativeInventoryItem | undefined {
        return Object.values(items as NativeInventoryItem[]).find(item => item.item.id === itemId);
    }
}
