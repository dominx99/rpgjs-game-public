import { RpgPlayer } from "@rpgjs/server";
import { UnitInformationHooks } from "./UnitInformationHooks";

export class UnitInformationInteraction {
    start(player: RpgPlayer) {
        player.off(UnitInformationHooks.SHOW);
        player.on(UnitInformationHooks.SHOW, (unitId: string) => this.show(player, unitId))
    }

    show(player: RpgPlayer, unitId: string) {
        player.unitPreviewId = unitId;
    }
}
