import { States } from "../../../server/src/enums/States";
import { FreezingColorFilter } from "./FreezingColorFilter";

export const StateToFilterMap = {
    [States.FREEZING]: FreezingColorFilter
}
