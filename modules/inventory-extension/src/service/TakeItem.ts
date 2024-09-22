import { RpgPlayer } from "@rpgjs/server";
import { ItemEntity } from "../interfaces/ItemModel";
import { ItemClass } from "../interfaces/ItemClass";
import { SpawnItem } from "./SpawnItem";
import { NativeInventoryItem } from "rpgjs-inventory";

interface AddItem {
    item: ItemEntity | ItemClass,
    nb: number,
}

export class TakeItem {
    static toInventory(player: RpgPlayer, addItemAction: AddItem): NativeInventoryItem | false {
        if (!addItemAction.item.id) {
            return false;
        }

        const spaceInInventoryForCount = player.inventory.spaceInInventoryForCount(addItemAction.item.id, addItemAction.nb);
        const numberToDrop = addItemAction.nb - spaceInInventoryForCount;

        if (numberToDrop > 0) {
            const map = player.getCurrentMap();

            if (!map) {
                return false;
            }

            SpawnItem.onGround({
                map,
                position: player.position,
                item: {
                    item: addItemAction.item,
                    nb: numberToDrop,
                }
            });
        }

        if (spaceInInventoryForCount > 0) {
            const inventory = player.addItem(addItemAction.item.id, spaceInInventoryForCount) as NativeInventoryItem;

            /** TODO: Verify if it's possible that addItem returns inventory with id as null or undefined */
            if (!inventory.item.id) {
                return false;
            }

            player.inventory.addItem({
                itemId: inventory.item.id,
                type: inventory.item.type,
                nb: spaceInInventoryForCount,
            });

            return inventory;
        }

        return false;
    }
}
