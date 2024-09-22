import { RpgMap, RpgPlayer, RpgWorld } from "@rpgjs/server";
import { ChatEvents } from "../enums/ChatEvents";

export enum ChatMessageType {
    Default = 'default',
    Info = 'info',
    Warning = 'warning',
    Error = 'error',
}

export interface InstantChatMessage {
    message: string;
    type?: ChatMessageType;
}

export interface ChatMessage extends InstantChatMessage {
    type: ChatMessageType;
    date: number;
}

export interface ChatMessageOptions {
    type?: ChatMessageType;
}

export class Chat {
    static sendToAll(data: InstantChatMessage, excludedPlayers: RpgPlayer[] = []) {
        RpgWorld.getPlayers()
            .filter(player => !excludedPlayers?.some(excludedPlayer => excludedPlayer.id === player.id))
            .forEach(player => {
                player.emit(ChatEvents.chatMessage, this.instantMessage(data, {
                    type: data.type || ChatMessageType.Default,
                }))
            });
    }

    static sendToPlayer(player: RpgPlayer, data: InstantChatMessage) {
        player.emit(ChatEvents.chatMessage, this.instantMessage(data, {
            type: data.type || ChatMessageType.Default,
        }));
    }

    static sendToPlayersOnMap(map: RpgMap, data: InstantChatMessage, excludedPlayers: RpgPlayer[] = []) {
        RpgWorld.getPlayersOfMap(map.id)
            .filter(player => !excludedPlayers?.some(excludedPlayer => excludedPlayer.id === player.id))
            .forEach(player => {
                player.emit(ChatEvents.chatMessage, this.instantMessage(data, {
                    type: data.type || ChatMessageType.Default,
                }))
            });
    }

    static instantMessage(message: InstantChatMessage, options?: ChatMessageOptions): ChatMessage {
        const data = {
            ...message,
            date: Date.now(),
            type: options?.type || ChatMessageType.Default,
        };

        return data;
    }
}
