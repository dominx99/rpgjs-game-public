import { Animation } from '@rpgjs/client'

export const IconSpritesheetPreset = () => ({
    framesWidth: 1,
    framesHeight: 1,
    textures: {
        [Animation.Stand]: {
            animations: [[{ time: 0, frameX: 0, frameY: 0 }]],
        },
    },
})
