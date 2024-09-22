import { RpgPlayer, RpgPlayerHooks, inject } from "@rpgjs/server";
import { UnitInformationInteraction } from "./src/hooks/UnitInformationInteraction";
import { PositionXY } from "@rpgjs/types";

declare module "@rpgjs/server" {
    export interface RpgPlayer {
        unitPreviewId: string | undefined,
        previewCustomParams?: {
            marginTop: number,
            scale: number,
            position?: PositionXY
        },
        canPreviewProfile?: boolean,
    }
}

const player: RpgPlayerHooks = {
    props: {
        unitPreviewId: String,
        canPreviewProfile: Boolean,
    },

    onJoinMap(player: RpgPlayer) {
        player.canPreviewProfile = true;

        inject(UnitInformationInteraction).start(player);
    }
}

const originalInitializeMethod = RpgPlayer.prototype.initialize;
RpgPlayer.prototype.initialize = function() {
    originalInitializeMethod.apply(this);

    this.canPreviewProfile = false;
}

export default player;
