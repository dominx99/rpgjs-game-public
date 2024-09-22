import { Class } from '../../../../src/heroes/decorators/Class'
import { ClassTypes } from '../../../../src/heroes/utils/ClassTypes';

/** @ts-ignore */
@Class({
    name: 'Mage',
    type: ClassTypes.MAGE,
    description: '',
    equippable: [],
    skillsToLearn: [],
    statesEfficiency: [],
    elementsEfficiency: [],
    graphics: {
        pernament: ['fur-body-white', 'vampire-male-head-white'],
        baseEquipment: {
            torso: 'male-collared-coat-brown-striped'
        },
        animations: ['bigslash'],
    }
})
export default class VampireClass {
}
