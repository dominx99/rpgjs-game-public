import { Presets, RpgPlayer } from '@rpgjs/server';
import { Skill } from '../../../../src/skills/decorators/Skill';
import EnergyOfTheCometSkillHandler from '../../../skills/src/handlers/EnergyOfTheCometSkillHandler';
import { ShowAnimation } from '../../../../src/graphics/ShowAnimation';

/** @ts-ignore */
@Skill({
    id: 'energy-of-the-comet',
    name: 'Energy of the comet',
    description: 'Energy of the comet',
    cooldown: 2000,
    spCost: 1,
    power: 10,
    variance: 10,
    hitRate: 1,
    icon: 'skill2',
    handler: EnergyOfTheCometSkillHandler,
    coefficient: {
        [Presets.INT]: 1,
        [Presets.ATK]: .1
    }
})
export default class EnergyOfTheCometSkill {
    onUse(attacker: RpgPlayer) {
        ShowAnimation.withReplace(attacker, 'attack');
    }
}
