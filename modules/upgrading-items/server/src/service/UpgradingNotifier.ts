import { RpgPlayer } from "@rpgjs/server"
import { Chat, ChatMessageType } from "../../../../chat/server/service/Chat"
import { ItemEntity } from "../../../../inventory-extension/src/interfaces/ItemModel"
import { isNumber } from "../../../../../src/shared/utils/Utils";

export const UpgradingNotifier = {
    failed: (player: RpgPlayer, item: ItemEntity) => {
        const displayName = item.displayName || 'item';

        Chat.sendToPlayer(player, {
            message: `You failed to upgrade ${displayName}!`,
            type: ChatMessageType.Error,
        });
    },

    success: (player: RpgPlayer, item: ItemEntity) => {
        const displayName = item.displayName || 'item';

        if (isNumber(item.level) && item.level < 7) {
            Chat.sendToPlayer(player, {
                message: `You successfully upgraded ${displayName} to +${item.level}!`,
                type: ChatMessageType.Default,
            });

            return;
        }

        Chat.sendToAll({
            message: `${player.name} upgraded ${displayName} to +${item.level}!`,
            type: ChatMessageType.Info,
        });
    }
}
