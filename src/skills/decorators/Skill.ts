import { Skill as RPGSkill } from "@rpgjs/database";
import { SkillOptions as RPGSkillOptions } from "@rpgjs/database/src/skill";
import { RpgPlayer } from '@rpgjs/server';
import { PositionXY } from '@rpgjs/types';

interface SkillHandler {
    use(player: RpgPlayer, mousePosition: PositionXY, skill: any): void;
}

export interface SkillStateOption {
    state: any,
    rate: number,
    duration: number
}

export interface SkillOptions extends RPGSkillOptions, ActionCooldown {
    icon: string,
    handler: SkillHandler | null,
    addStates?: SkillStateOption[]
}

export function Skill(options: SkillOptions): (target: any, propertyKey: any) => void {
    return function (target: any) {
        RPGSkill(options)(target);
    }
}
