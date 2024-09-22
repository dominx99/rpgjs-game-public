import { RpgPlayer, RpgPlayerHooks, Speed } from "@rpgjs/server";
import { SpeedManager } from "./src/managers/SpeedManager";
import { Utils } from "@rpgjs/common";
import { StateWithDurationManager } from "./src/managers/StateWithDurationManager";
import { StateSchema } from "./src/schemas/StateSchema";

declare module "@rpgjs/server" {
    export interface RpgPlayer extends SpeedManager, StateWithDurationManager { }
}

const player: RpgPlayerHooks = {
    props: {
        states: [StateSchema],
        stateTimers: Object,
    }
}

Utils.applyMixins(RpgPlayer, [SpeedManager, StateWithDurationManager]);

const originalInitializeMethod = RpgPlayer.prototype.initialize;
RpgPlayer.prototype.initialize = function() {
    originalInitializeMethod.apply(this);

    this.speedEffects = [];
    this.speedBase = Speed.Normal;
    this.stateTimers = {};
}

export default player;
