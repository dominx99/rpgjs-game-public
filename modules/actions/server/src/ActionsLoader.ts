import { RpgPlayer } from "@rpgjs/server";
import { Action } from "./ActionManager";

export default class ActionsLoader {
    static load(player: RpgPlayer) {
        const actions = JSON.parse(JSON.stringify(player.actions));

        actions.forEach((action: Action) => {
            player.setAction(action);
        });
    }
}
