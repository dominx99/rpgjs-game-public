import { RpgPlayer } from "@rpgjs/server";
import { Chat, ChatMessageType } from "../../../chat/server/service/Chat";

export enum InventoryNotificationMessage {
    NOT_ENOUGH_SPACE = 'You gained {item}, but you don\'t have enough space in your inventory!',
    NOT_ENOUGH_SPACE_TO_PICKUP = 'You don\'t have enough space in your inventory to pickup {item}!',
    NOT_ENOUGH_SPACE_TO_UNEQUIP = 'You don\'t have enough space in your inventory to unequip {item}!',
    GAINED_ITEM = 'You gained {item}!',
}

export const FullInventory = {
    notify: (player: RpgPlayer, itemName: string, message: InventoryNotificationMessage) => {
        Chat.sendToPlayer(player, {
            message: message.replace('{item}', itemName),
            type: ChatMessageType.Warning,
        });
    }
}
