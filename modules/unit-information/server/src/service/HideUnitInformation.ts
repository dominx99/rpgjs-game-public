import { RpgPlayer } from "@rpgjs/server";

export class HideUnitInformation {
    hide(attacker: RpgPlayer, victim: RpgPlayer) {
        if (attacker.unitPreviewId !== victim.id) {
            return;
        }

        attacker.unitPreviewId = undefined;
    }
}
