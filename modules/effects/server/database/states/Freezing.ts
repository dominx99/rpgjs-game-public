import { ExtendedEffect } from '../../../client/src/enums/Effect';
import { State } from '../../src/decorators/State';
import { States } from '../../src/enums/States';

@State({
    id: States.FREEZING,
    name: 'Freezing',
    additionalEffects: [
        ExtendedEffect.FREEZE
    ]
})
export default class Freezing {}
