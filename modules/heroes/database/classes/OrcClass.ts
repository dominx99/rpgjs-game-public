import { Class } from '../../../../src/heroes/decorators/Class'
import { ClassTypes } from '../../../../src/heroes/utils/ClassTypes';

/** @ts-ignore */
@Class({
    name: 'Warrior',
    type: ClassTypes.WARRIOR,
    description: '',
    equippable: [],
    skillsToLearn: [],
    statesEfficiency: [],
    elementsEfficiency: [],
    graphics: {
        pernament: ['male-body-zombie-green', 'orc-male-head-zombie-green'],
        baseEquipment: {
            torso: 'male-tabard-walnut'
        },
        animations: ['bigslash'],
    }
})
export default class OrcClass {
}
