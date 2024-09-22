import { Animation } from '@rpgjs/client'

export const SequenceAnimationPreset = (framesWidth: number, framesHeight: number, speed: number = 5) => {
    const anim = (framesWidth: number, framesHeight: number, speed: number) => {
        const array: any = []
        for (let y = 0; y < framesHeight; y++) {
            for (let x = 0; x < framesWidth; x++) {
                const durationOfFrame = speed * (y * framesWidth + x);
                array.push({ time: durationOfFrame, frameX: x, frameY: y })
            }
        }
        array.push({ time: framesWidth * speed });
        return array
    }

    return {
        framesWidth,
        framesHeight,
        textures: {
            [Animation.Stand]: {
                animations: () => [anim(framesWidth, framesHeight, speed)]
            }
        },
    }
}
