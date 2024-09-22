import { Class } from '../../../../src/heroes/decorators/Class'
import { ClassTypes } from '../../../../src/heroes/utils/ClassTypes'

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
        pernament: ['fur-body-tan', 'troll-male-head-tan'],
        baseEquipment: {
            torso: 'male-vest-open-black',
            legs: 'male-pants-black'
        },
        animations: ['bigslash'],
    }
})
export default class TrollClass {
}
