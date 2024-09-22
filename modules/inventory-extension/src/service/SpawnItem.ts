import { EventData, RpgEvent, RpgMap, RpgPlayer } from "@rpgjs/server";
import { PositionXY } from "@rpgjs/types";
import { ItemEntity } from "../interfaces/ItemModel";
import { ItemClass } from "../interfaces/ItemClass";
import { TakeItem } from "./TakeItem";
import { FullInventory, InventoryNotificationMessage } from "./FullInventory";

export interface DropOnGround {
    map: RpgMap,
    position: PositionXY,
    item: {
        item: ItemEntity | ItemClass,
        nb: number,
    },
}

export class SpawnItem {
    static onGround({ map, position, item }: DropOnGround) {
        /** @ts-ignore */
        @EventData({
            name: 'dropped-item',
        })
        class DroppedItem extends RpgEvent {
            onInit() {
                this.setGraphic(item.item.icon || 'item-placeholder');

                this.through = true;
                this.throughOtherPlayer = true;
            }
            onPickUp(player: RpgPlayer) {
                if (!player.inventory?.hasEmptySlot()) {
                    FullInventory.notify(player, item?.item?.displayName || 'item', InventoryNotificationMessage.NOT_ENOUGH_SPACE_TO_PICKUP);

                    return;
                }

                TakeItem.toInventory(player, {
                    item: item.item,
                    nb: item.nb
                });
                this.remove();
            }
        }

        map.createDynamicEvent({
            x: position.x + 16,
            y: position.y + 32,
            event: DroppedItem,
        });
    }
}
