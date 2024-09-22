import { RpgPlayer } from "@rpgjs/server";
import { NativeInventoryItem } from "rpgjs-inventory";
import { NeededToUpgradeItem } from "../NeededToUpgradeItem";

export class RemoveNeededItems {
    static fromInventory(player: RpgPlayer, item: NativeInventoryItem) {
        const neededItems = NeededToUpgradeItem.all(item.item.level as number);

        neededItems.forEach(neededItem => {
            if (!neededItem.item.id) {
                throw new Error('Item id is not defined');
            }

            player.removeItem(neededItem.item.id, neededItem.nb);
            player.inventory.removeByItemId(neededItem.item.id, neededItem.nb);
        });
    }
}
