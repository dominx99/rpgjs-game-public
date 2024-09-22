import { Animation, Direction } from '@rpgjs/client'
import { animationAttackSpeed } from './LPCConfig'

export const LPCAttackSpritesheet = () => {
    const frameY = (direction: Direction) => {
        return {
            [Direction.Down]: 2,
            [Direction.Left]: 1,
            [Direction.Right]: 3,
            [Direction.Up]: 0
        }[direction]
    }

    const anim = (direction: Direction, framesWidth: number, speed: number) => {
        const array: any = []
        for (let i = 0; i < framesWidth; i++) {
            array.push({ time: i * speed, frameX: i, frameY: frameY(direction) })
        }
        array.push({ time: framesWidth * speed });
        return array
    }

    return {
        spriteRealSize: {
            width: 48,
            height: 52,
        },
        framesWidth: 6,
        framesHeight: 4,
        textures: {
            [Animation.Attack]: {
                animations: (direction: Direction) => [anim(direction, 6, animationAttackSpeed)]
            }
        },
    }
}
