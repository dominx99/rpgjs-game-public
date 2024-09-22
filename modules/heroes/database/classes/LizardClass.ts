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
        pernament: ['human-male-body-green', 'lizard-male-head-green', 'lizard-tail-green-fg', 'lizard-tail-green-bg'],
        baseEquipment: {
            legs: 'male-pants-black'
        },
        animations: ['bigslash'],
    }
})
export default class LizardClass {
}
