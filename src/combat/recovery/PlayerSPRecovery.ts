import { Presets, RpgPlayer, RpgWorld } from "@rpgjs/server";
import { interval, takeWhile } from "rxjs";
import { PlayerVariables } from "../../../modules/upgrading-items/server/src/utils/PlayerVariables";

export class PlayerSPRecovery {
    static enable(player: RpgPlayer) {
        if (player.getVariable(PlayerVariables.SP_RECOVERY)) {
            return;
        }

        player.setVariable(PlayerVariables.SP_RECOVERY, true);

        interval(1000)
            .pipe(
                takeWhile(() => RpgWorld.getPlayers().map(player => player.id).includes(player.id)),
                takeWhile(() => player.getVariable(PlayerVariables.SP_RECOVERY))
            )
            .subscribe({
                next: () => {
                    if (player.sp >= player.getParamValue(Presets.MAXSP)) {
                        return;
                    }

                    player.recovery({ sp: (player.sp / player.getParamValue(Presets.MAXSP)) + 0.01 });
                },
            });
    }
}
