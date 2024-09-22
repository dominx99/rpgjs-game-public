import { Class } from '../../../../src/heroes/decorators/Class'
import { ClassTypes } from '../../../../src/heroes/utils/ClassTypes';

/** @ts-ignore */
@Class({
    name: 'Mage',
    type: ClassTypes.MAGE,
    description: '',
    equippable: [],
    statesEfficiency: [],
    elementsEfficiency: [],
    skillsToLearn: [],
    graphics: {
        pernament: ['human-male-body-light', 'human-male-head-light', 'long-ears-light', 'male-hair-bangslong2-platinum'],
        baseEquipment: {
            torso: 'male-jacket-frock-walnut',
            legs: 'male-pants-brown'
        },
        animations: ['bigslash', 'fire-superslash', 'bow-shoot', 'bow-arrow'],
    },
})
export default class ElfClass {
}
