import FireSuperslashSkill from '../skills/FireSuperslashSkill'
import { Class } from '../../../../src/heroes/decorators/Class'
import { ClassTypes } from '../../../../src/heroes/utils/ClassTypes'

/** @ts-ignore */
@Class({
    name: 'Archer',
    type: ClassTypes.ARCHER,
    description: '',
    equippable: [],
    skillsToLearn: [
        {
            level: 1,
            skill: FireSuperslashSkill,
        }
    ],
    statesEfficiency: [],
    elementsEfficiency: [],
    graphics: {
        pernament: ['human-male-body-light', 'human-male-head-light', 'male-hair-spiked2-ash', 'kerchief-male-black'],
        baseEquipment: {
            torso: 'male-tabard-white',
            legs: 'male-pants-black'
        },
        animations: ['bigslash', 'fire-superslash', 'bow-shoot', 'bow-arrow'],
    }
})
export default class HumanClass {
}
