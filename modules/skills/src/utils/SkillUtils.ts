import { Presets } from "@rpgjs/server";
import { SkillContract } from "../contracts/SkillContract";

export const getAttackDamageCoefficient = (skill: SkillContract) => {
    return skill.coefficient?.[Presets.ATK] * 100;
}

export const getMagicDamageCoefficient = (skill: SkillContract) => {
    return skill.coefficient?.[Presets.INT] * 100;
}

export const hasAttackDamageCoefficient = (skill: SkillContract) => {
    return !!getAttackDamageCoefficient(skill);
}

export const hasMagicDamageCoefficient = (skill: SkillContract) => {
    return !!getMagicDamageCoefficient(skill);
}

export const hasMoreThanOneDamageCoefficient = (skill: SkillContract) => {
    return hasAttackDamageCoefficient(skill) && hasMagicDamageCoefficient(skill);
}

