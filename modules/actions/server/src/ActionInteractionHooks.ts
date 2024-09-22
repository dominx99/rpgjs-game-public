import { RpgPlayer } from "@rpgjs/server";
import InputHandler from "./InputHandler";
import { PositionXY } from "@rpgjs/types";
import { ActionKey } from "./ActionManager";

interface KeyPressed {
    input: string,
    mousePosition: PositionXY,
}

interface RemoveAction {
    actionKey: ActionKey;
}

export default class ActionInteractionHooks {
    static init(player: RpgPlayer) {
        player.off('key.pressed');
        player.on('key.pressed', async (data: KeyPressed) => {
            await InputHandler.handle(player, data);
        });

        player.off('action-bar.set');
        player.on('action-bar.set', (event: any) => {
            if (event.actionKey > 7 || event.actionKey < 1) {
                return;
            }

            player.setAction({
                key: event.actionKey,
                id: event.action.id,
                type: event.action.type,
                meta: event.action.meta,
            });
        })

        player.off('action-bar.remove');
        player.on('action-bar.remove', (event: RemoveAction) => {
            if (event.actionKey > 7 || event.actionKey < 1) {
                return;
            }

            player.removeActionByKey(event.actionKey);
        });
    }
}
