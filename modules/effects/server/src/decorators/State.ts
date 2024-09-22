import { State as RPGState } from "@rpgjs/database";
import { StateOptions as RPGStateOptions } from "@rpgjs/database";
import { EffectType } from "../../../client/src/enums/Effect";

export interface StateEffectOptions {
    additionalEffects?: EffectType[]
}

export interface StateOptions extends RPGStateOptions, StateEffectOptions {
}

export function State(options: StateOptions) {
    return function (target: any) {
        RPGState(options)(target);
    }
}
