import { RpgPlayer } from "@rpgjs/server";
import { KillableMob } from "../../enemies/mobs/KillableMob";

export class GainExperience {
    static gainExp(player: RpgPlayer, victim: KillableMob): number {
        player.exp += victim.expToGainAfterKill;

        return victim.expToGainAfterKill;
    }

    /** @deprecated */
    static gainExpBasedOnLevel(player: RpgPlayer, victim: KillableMob) {
        if (player.level > (victim.level + 10)) {
            return 0;
        }

        const gainedExp = victim.expToGainAfterKill / ((player.level - victim.level) || 1);

        player.exp += gainedExp;
    }
}
