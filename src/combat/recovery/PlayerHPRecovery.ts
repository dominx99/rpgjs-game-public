import { Presets, RpgPlayer, RpgWorld } from "@rpgjs/server";
import { interval, takeWhile } from "rxjs";
import { PlayerVariables } from "../../../modules/upgrading-items/server/src/utils/PlayerVariables";

export class PlayerHPRecovery {
    static enable(player: RpgPlayer) {
        if (player.getVariable(PlayerVariables.HP_RECOVERY)) {
            return;
        }

        player.setVariable(PlayerVariables.HP_RECOVERY, true);

        interval(1000)
            .pipe(
                takeWhile(() => RpgWorld.getPlayers().map(player => player.id).includes(player.id)),
                takeWhile(() => player.getVariable(PlayerVariables.HP_RECOVERY))
            )
            .subscribe({
                next: () => {
                    if (player.hp >= player.getParamValue(Presets.MAXHP)) {
                        return;
                    }

                    player.recovery({ hp: (player.hp / player.getParamValue(Presets.MAXHP)) + 0.01 });
                },
            });
    }
}
