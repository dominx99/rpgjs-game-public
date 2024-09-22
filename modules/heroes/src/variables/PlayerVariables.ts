import { RpgPlayer } from "@rpgjs/server";
import { PlayerVariables } from "../../../upgrading-items/server/src/utils/PlayerVariables";

export const PlayerVariablesManager = {
    clear: (player: RpgPlayer) => {
        player.removeVariable(PlayerVariables.HP_RECOVERY);
    }
}
