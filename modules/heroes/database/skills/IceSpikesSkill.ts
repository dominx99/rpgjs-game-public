import { Presets, RpgPlayer } from '@rpgjs/server';
import { Skill } from '../../../../src/skills/decorators/Skill';
import { ShowAnimation } from '../../../../src/graphics/ShowAnimation';
import { IceSpikesSkillHandler } from '../../../skills/src/handlers/IceSpikesSkillHandler';
import Freezing from '../../../effects/server/database/states/Freezing';

/** @ts-expect-error decorator issue */
@Skill({
    id: 'ice-spikes-skill',
    name: 'Ice spikes',
    description: 'Throw ice spikes at the enemy',
    cooldown: 5,
    spCost: 5,
    power: 15,
    variance: 10,
    hitRate: 1,
    icon: 'ice-spikes-icon',
    handler: IceSpikesSkillHandler,
    coefficient: {
        [Presets.INT]: 1,
        [Presets.ATK]: .1
    },
    addStates: [{ rate: .5, state: Freezing, duration: 1500 }],
})
export default class IceSpikesSkill {
    onUse(attacker: RpgPlayer) {
        ShowAnimation.withReplace(attacker, 'skill');
    }
}
