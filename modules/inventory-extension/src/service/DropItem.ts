import { RpgPlayer } from "@rpgjs/server";
import { SpawnItem } from './SpawnItem';
import { Slot } from "rpgjs-inventory";
import { NativeItems } from "../utils/NativeItems";

export interface DropOnGround {
    player: RpgPlayer,
    amountToDrop: number,
    slot: Slot,
}

export class DropItem {
    static fromInventory({ player, amountToDrop, slot }: DropOnGround): void {
        const backpackItem = player.inventory.getBackpackItemBySlot(slot);
        if (!backpackItem) {
            return;
        }
        const item = NativeItems.findItemById(player, backpackItem.itemId);
        const map = player.getCurrentMap();

        if (!map || !item || !item.item.id) {
            return;
        }

        if (amountToDrop > backpackItem.nb) {
            amountToDrop = backpackItem.nb;
        }

        player.inventory.decreaseQuantityOfSlot(slot, amountToDrop);
        player.removeItem(item.item.id, amountToDrop);

        SpawnItem.onGround({
            map,
            position: player.position,
            item: {
                item: item.item,
                nb: amountToDrop,
            },
        })
    }
}
