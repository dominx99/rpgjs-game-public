import { Presets, RpgPlayer } from '@rpgjs/server';
import { Skill } from '../../../../src/skills/decorators/Skill';
import { ShowAnimation } from '../../../../src/graphics/ShowAnimation';
import { ThrowFreezingSkillHandler } from '../../../skills/src/handlers/ThrowFreezingSkillHandler';
import Freezing from '../../../effects/server/database/states/Freezing';

/** @ts-expect-error decorator issue */
@Skill({
    id: 'throw-freezing-skill',
    name: 'Throw freezing',
    description: 'Freeze the enemy',
    cooldown: 4755,
    spCost: 15,
    power: 50,
    variance: 10,
    hitRate: 1,
    icon: 'throw-freezing-icon',
    handler: ThrowFreezingSkillHandler,
    coefficient: {
        [Presets.INT]: 1.5,
        [Presets.ATK]: .1
    },
    addStates: [
        {
            state: Freezing,
            rate: 1,
            duration: 1500
        }
    ]
})
export default class ThrowFreezingSkill {
    onUse(attacker: RpgPlayer) {
        ShowAnimation.withReplace(attacker, 'attack');
    }
}
