import { RpgPlayer } from "@rpgjs/server";
import { KillableMob } from "../../enemies/mobs/KillableMob";
import Drop from "../../../modules/inventory-extension/src/interfaces/Drop";
import { TakeItem } from "../../../modules/inventory-extension/src/service/TakeItem";
import { Chat } from "../../../modules/chat/server/service/Chat";
import { FullInventory, InventoryNotificationMessage } from "../../../modules/inventory-extension/src/service/FullInventory";

export class GainItem {
    static drop(mob: KillableMob, player: RpgPlayer) {
        const items: Drop[] = mob.getItemsToDrop();

        if (items.length === 0) {
            return;
        }

        const item = this.getRandomItemOrNull(items);

        if (item === null) {
            return;
        }

        this.gainItem(player, item);
    }

    private static getRandomItemOrNull(items: Drop[]): Drop | null {
        const random = Math.random() * 10000;

        let sum = 0;
        for (const item of items) {
            sum += item.probability;
            if (random <= sum) {
                return item;
            }
        }

        return null;
    }

    private static gainItem(player: RpgPlayer, drop: Drop) {
        const item = drop.item();

        if (!item.id) {
            return;
        }

        player.server.addInDatabase(item.id, item);

        const itemInInventory = TakeItem.toInventory(player, {
            item,
            nb: 1,
        });

        if (!itemInInventory) {
            const displayName = item.displayName || 'item';
            FullInventory.notify(player, displayName, InventoryNotificationMessage.NOT_ENOUGH_SPACE)

            return;
        }

        Chat.sendToPlayer(player, {
            message: `You gained ${itemInInventory.item.displayName}!`,
        })
    }
}
