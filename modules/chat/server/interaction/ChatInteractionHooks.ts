import { RpgPlayer } from "@rpgjs/server";
import { ChatEvents } from "../enums/ChatEvents";
import { Chat, ChatMessageType } from "../service/Chat";
import { Channel } from "../enums/Channel";
import { Cooldown, CooldownType } from "../../../cooldowns/src/CooldownManager";
import { isNil, isNumber } from "../../../../src/shared/utils/Utils";
import { getRemainingTimeInSeconds } from "../../../../src/shared/utils/TimeUtils";

interface ChatMessageEvent {
    message: string,
    channel: string
}

export class ChatInveractionHooks {
    static init(player: RpgPlayer) {
        player.off(ChatEvents.chatMessage)
        player.on(ChatEvents.chatMessage, (event: ChatMessageEvent) => this.onChatMessage(player, event))
    }

    static onChatMessage(player: RpgPlayer, { message, channel }: ChatMessageEvent) {
        message = message.trim();
        message = `${player.name}: ${message}`;

        if (channel.match(Channel.GLOBAL)) {
            this.onGlobalChatMessage(player, message);
        }

        if (channel.match(Channel.MAP)) {
            const map = player.getCurrentMap();

            if (!map) {
                return;
            }

            Chat.sendToPlayersOnMap(map, { message });
        }
    }

    static onGlobalChatMessage(player: RpgPlayer, message: string) {
        if (player.hasCooldown('global', CooldownType.Chat)) {
            const cooldown = player.getCooldown('global', CooldownType.Chat) as Cooldown;

            if (!isNumber(cooldown?.after)) {
                return;
            }

            const remainingTime = getRemainingTimeInSeconds(cooldown.after);
            Chat.sendToPlayer(player, { message:  `You can't send a message for ${remainingTime}s`, type: ChatMessageType.Warning })

            return;
        }

        player.addCooldown('global', CooldownType.Chat, 10000);

        Chat.sendToAll({ message, type: ChatMessageType.Info });
    }
}
