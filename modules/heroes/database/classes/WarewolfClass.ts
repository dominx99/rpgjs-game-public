import { Class } from '../../../../src/heroes/decorators/Class'
import { ClassTypes } from '../../../../src/heroes/utils/ClassTypes';

/** @ts-ignore */
@Class({
    name: 'Rogue',
    type: ClassTypes.ROGUE,
    description: '',
    equippable: [],
    skillsToLearn: [],
    statesEfficiency: [],
    elementsEfficiency: [],
    graphics: {
        pernament: ['fur-body-grey', 'wolf-male-head-grey'],
        baseEquipment: {
            legs: 'male-pants-brown'
        },
        animations: ['bigslash'],
    }
})
export default class WarewolfClass {
}
