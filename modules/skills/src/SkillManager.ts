import { RpgPlayer } from "@rpgjs/server";
import { PositionXY } from "@rpgjs/types";
import { Vector2d } from "@rpgjs/common";
import { SkillOptions } from "../../../src/skills/decorators/Skill";
import { CooldownType } from "../../cooldowns/src/CooldownManager";

export default class SkillManager {
    static useSkill(attacker: RpgPlayer, skillId: string, mousePosition: PositionXY) {
        const skill: SkillOptions = attacker.getSkill(skillId);

        if (attacker.hasCooldown(skillId, CooldownType.Skill)) {
            return;
        }

        attacker.addCooldown(skillId, CooldownType.Skill, skill.cooldown || 1000);

        attacker.useSkill(skillId);

        if (!skill.handler) {
            return;
        }

        skill.handler.use(
            attacker,
            new Vector2d(mousePosition.x, mousePosition.y),
            skill
        );
    }
}
