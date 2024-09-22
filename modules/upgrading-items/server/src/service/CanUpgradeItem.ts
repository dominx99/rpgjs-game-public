import { NativeInventoryItem } from "rpgjs-inventory";
import { NeededToUpgradeItem } from "../NeededToUpgradeItem";
import { RpgPlayer } from "@rpgjs/server";

export class CanUpgradeItem {
    static check(player: RpgPlayer, item: NativeInventoryItem): void {
        const neededItems = NeededToUpgradeItem.all(item.item.level as number);

        neededItems.forEach(neededItem => {
            if (!neededItem.item.id) {
                throw new Error('Item id is not defined');
            }

            const item = player.getItem(neededItem.item.id);

            if (!item || item.nb < neededItem.nb) {
                throw new Error('You do not have required items to upgrade');
            }
        });
    }
}
