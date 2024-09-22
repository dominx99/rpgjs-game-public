import { Slot } from "rpgjs-inventory";
import { UpgradingItems } from "../../../upgrading-items/server/src/UpgradingItems";
import { isNil } from "../../../../src/shared/utils/Utils";
import { InventorySlotContract } from "../../../inventory-extension/src/contracts/ItemContract";

export class InventoryManager {
    static moveItem(socket: any, from: Slot, to: Slot, amount: number) {
        socket.emit('inventory.slots.move', {
            from: from,
            to: to,
            nb: amount,
        })
    }

    static dropItem(socket: any, slot: Slot, amount?: number) {
        if (amount === undefined) {
            return;
        }

        socket.emit('inventory.slots.drop', {
            slot: slot,
            amount,
        })
    }

    static isUpgrading(sourceItem?: InventorySlotContract, targetItem?: InventorySlotContract): boolean {
        if (!sourceItem || !targetItem) {
            return false;
        }

        return UpgradingItems.isUpgradingItemById(sourceItem.item.id || '')
            && !isNil(targetItem.item.level);
    }
}
