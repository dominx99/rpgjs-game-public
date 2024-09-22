import { RpgPlayer } from "@rpgjs/server";

export const StateSchema = {
    ...RpgPlayer.schemas.states[0],
    additionalEffects: Object,
    effects: [String],
}
