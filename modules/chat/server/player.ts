import { RpgPlayer, RpgPlayerHooks, RpgMap, Control } from '@rpgjs/server'
import { Chat, ChatMessageType } from './service/Chat'
import { ChatEvents } from './enums/ChatEvents';
import { ChatInveractionHooks } from './interaction/ChatInteractionHooks';

export const player: RpgPlayerHooks = {
    onInput(player: RpgPlayer, { input }) {
        if (input === 'chat') {
            player.emit(ChatEvents.chatOpen);
        }
        if (input === Control.Back) {
            player.emit(ChatEvents.chatClose);
        }
    },
    onJoinMap(player: RpgPlayer, map: RpgMap) {
        ChatInveractionHooks.init(player);

        Chat.sendToPlayersOnMap(
            map,
            {
                message: `${player.name} join this map`,
                type: ChatMessageType.Info,
            },
            [player]
        );
    },
    onLeaveMap(player: RpgPlayer, map: RpgMap) {
        Chat.sendToPlayersOnMap(
            map,
            {
                message: `${player.name} left this map`,
                type: ChatMessageType.Info,
            },
            [player]
        )
    }
}
