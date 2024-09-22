import { RpgPlayer } from "@rpgjs/server";
import { Slot, UnequipItem, UseItem } from "rpgjs-inventory";
import DomainError from "../../../../src/shared/error/DomainError";
import { DropItem } from "../service/DropItem";
import { GraphicsOfPlayer } from "../../../../src/graphics/PlayerGraphics";
import { ItemType } from "../enum/ItemType";
import { FullInventory, InventoryNotificationMessage } from "../service/FullInventory";

export interface MoveItemContext {
    from: Slot,
    to: Slot,
    nb?: number,
}

export class InventoryInteractionHooks {
    static init(player: RpgPlayer) {
        player.off('inventory.slots.move');
        player.off('inventory.slots.drop');
        player.off('inventory.useItem');
        player.off('inventory.unEquip');

        player.on('inventory.unEquip', (itemType: ItemType) => InventoryInteractionHooks.onUnequip(player, itemType));
        player.on(
            'inventory.useItem',
            ({ itemId, slot }: { itemId: string, slot: Slot }) => InventoryInteractionHooks.onUseItem(player, slot, itemId)
        );
        player.on('inventory.slots.move', (context: MoveItemContext) => InventoryInteractionHooks.onMoveItem(player, context));
        player.on('inventory.slots.drop', ({ slot, amount }: { slot: Slot, amount?: number }) => InventoryInteractionHooks.onDropItem(player, slot, amount));
    }

    static onUnequip(player: RpgPlayer, itemType: ItemType) {
        try {
            if (!player.inventory.hasEmptySlot()) {
                FullInventory.notify(player, itemType, InventoryNotificationMessage.NOT_ENOUGH_SPACE_TO_UNEQUIP)

                return;
            }
            UnequipItem.byPlayer(player, itemType);
            GraphicsOfPlayer.sync(player);
        } catch (e: any) {
            if (e instanceof DomainError) {
                player.showNotification(e.message);
            }
        }
    }

    static async onUseItem(player: RpgPlayer, slot: Slot, itemId: string) {
        await UseItem.fromInventory(player, slot, itemId);
    }

    static onMoveItem(player: RpgPlayer, { from, to, nb }: MoveItemContext) {
        if (nb != undefined && nb <= 0) {
            return;
        }

        player.inventory.moveItem(from, to, nb);
    }

    static onDropItem(player: RpgPlayer, slot: Slot, nb?: number) {
        if (nb === undefined || nb <= 0) {
            return;
        }

        DropItem.fromInventory({
            player,
            amountToDrop: nb,
            slot,
        });
    }
}
