import { Presets } from '@rpgjs/server'
import { Actor } from '@rpgjs/database'
import LizardClass from '../classes/LizardClass'
import HeroActorPreset from './../../../../src/heroes/actors/HeroActorPreset';

const { MAXHP } = Presets

@Actor({
    ...HeroActorPreset(),
    name: 'Lizard',
    description: 'A warrior is a person specializing in combat or warfare, especially within the context of a tribal or clan-based warrior culture society that recognizes a separate warrior class or caste.',
    parameters: {
        [MAXHP]: {
            start: 700,
            end: 10000
        }
    },
    class: LizardClass
})
export default class LizardActor {
}
