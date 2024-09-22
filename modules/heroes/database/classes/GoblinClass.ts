import { Class } from '../../../../src/heroes/decorators/Class'
import { ClassTypes } from '../../../../src/heroes/utils/ClassTypes';

/** @ts-ignore */
@Class({
    name: 'Archer',
    type: ClassTypes.ARCHER,
    description: '',
    equippable: [],
    skillsToLearn: [],
    statesEfficiency: [],
    elementsEfficiency: [],
    graphics: {
        pernament: ['human-male-body-light', 'goblin-male-head-light', 'male-nose-big-light'],
        baseEquipment: {
            torso: 'male-shortsleeve-rose',
            legs: 'male-pants-brown'
        },
        animations: ['bigslash'],
    }
})
export default class GoblinClass {
}
