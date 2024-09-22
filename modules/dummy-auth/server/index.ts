import { RpgModule, RpgPlayer, RpgServer, RpgServerEngine, inject } from "@rpgjs/server";
import { InventoryDebug } from "../../inventory-extension/src/debug/InventoryDebug";
import { ActionKey, ActionType } from "../../actions/server/src/ActionManager";

/** @ts-ignore */
@RpgModule<RpgServer>({
    hooks: {
        player: ['onAuthSuccess', 'onCharacterSelected']
    },
    engine: {
        onStart(engine: RpgServerEngine) {
        }
    },
    player: {
        onConnected(player: RpgPlayer) {
            const server = inject(RpgServerEngine);

            server.module.emit('server.player.onCharacterSelected', [player, 'humanactor'], true)
            server.module.emit('server.player.onAuthSuccess', [player, {}], true)
        },
        onCharacterSelected(player: RpgPlayer, actorId: string) {
            player.setActor(actorId);
        },
        onJoinMap(player: RpgPlayer) {
            // TODO: Remove this code before release
            InventoryDebug.addRandomItems(player);

            player.setAction({
                id: 'energy-of-the-comet',
                type: ActionType.Skill,
                key: ActionKey.One,
            });

            player.setAction({
                id: 'aquamarine-green-aoe-skill',
                type: ActionType.Skill,
                key: ActionKey.Two,
            });

            player.setAction({
                id: 'throw-freezing-skill',
                type: ActionType.Skill,
                key: ActionKey.Three,
            });

            player.setAction({
                id: 'ice-spikes-skill',
                type: ActionType.Skill,
                key: ActionKey.Four,
            });
        },
    }
})
export default class RpgServerModule { }
