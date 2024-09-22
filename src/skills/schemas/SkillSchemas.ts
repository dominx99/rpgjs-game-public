import { RpgPlayer } from "@rpgjs/server";

export const SkillSchema = {
    ...RpgPlayer.schemas.skills[0],
    icon: String,
    cooldown: Number,
    coefficient: Object,
}
