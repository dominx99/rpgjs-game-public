import { RpgPlayer, RpgPlayerHooks, RpgServerEngine, inject } from "@rpgjs/server";
import Player from '@rpgjs/title-screen/src/server/mmorpg/model';
import { Utils } from '@rpgjs/common';
import { DatabaseManager } from "./src/DatabaseManager";

declare module '@rpgjs/server' {
    export interface RpgServerEngine extends DatabaseManager {
    }
}

const player: RpgPlayerHooks = {
    onDisconnected(player: RpgPlayer) {
        player.save();
    },
    onLevelUp(player: RpgPlayer) {
        player.save();
    },
    async canAuth(player: RpgPlayer) {
        try {
            const user = await Player.findById(player.mongoId);

            if (!user || !user.data) {
                return true;
            }

            const json = JSON.parse(user.data);

            if (Array.isArray(json.items)) {
                json.items.forEach((item: any) => {
                    const server = inject(RpgServerEngine);
                    const data = server.database[item.item.id]

                    if (!data) {
                        server.addInDatabaseInternal(item.item.id, item.item);
                    }
                })
            }
        } catch (e: any) {
            console.error('cannot auth', e);

            return false;
        }

        return true;
    },
}

Utils.applyMixins(RpgServerEngine, [DatabaseManager]);

export default player;
