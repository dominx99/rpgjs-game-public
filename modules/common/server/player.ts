import { RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";
import { Utils } from '@rpgjs/common'
import { ParameterManager } from "./src/managers/ParameterManager";

const player: RpgPlayerHooks = {
    props: {
        expForCurrentLevel: {
            $permanent: false,
        },
        level: {
            $effects: ['$this.expForNextlevel', '$this.expForCurrentLevel', '$this.param']
        },
    }
}

Utils.applyMixins(RpgPlayer, [ParameterManager]);

export default player;
