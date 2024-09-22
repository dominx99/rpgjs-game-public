import { Presets } from '@rpgjs/server'
import { Actor } from '@rpgjs/database'
import HumanClass from '../classes/HumanClass'
import HeroActorPreset from '../../../../src/heroes/actors/HeroActorPreset'

const { MAXHP, ATK } = Presets

@Actor({
    ...HeroActorPreset(),
    name: 'Human',
    description: 'Humans considered themselves one of the most intelligent races in the universe, and they did not believe in dreams and nightmares. They believed that science and knowledge were the key to power. They did not believe in nature deities and did not perform rituals. When they found the first artifact in the Forgotten Lands they believed it was an invention of another race giving special abilities to selected users via neurotransmitters. However, the truth was that humans were the fodder of the gods of feelings - hate, love, jealousy, anger, sadness and fear. They preyed on the race due to the fact that people did not allow the possibility of the existence of higher entities, they thought that the voices in their heads were their own thoughts, telling them what to do at any given moment. Their race through this paradox was held by many people with special abilities.',
    parameters: {
        [MAXHP]: {
            start: 400,
            end: 6625
        },
    },
    class: HumanClass
})
export default class HumanActor {
}
