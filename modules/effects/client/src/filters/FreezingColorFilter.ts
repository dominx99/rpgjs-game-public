import { ColorOverlayFilter } from "@pixi/filter-color-overlay";
import { States } from "../../../server/src/enums/States";

export class FreezingColorFilter extends ColorOverlayFilter {
    stateId: string = States.FREEZING;

    constructor() {
        super(0x35bdcc, 0.5);
    }
}
