import { Direction } from "@rpgjs/client";
import { FrameOptions } from "@rpgjs/client/lib/Sprite/Spritesheet";

export const LPCDirectionMap = [0, 3, 2, 1];

export const getAnimations = (
    direction: Direction,
    frameY: number,
    frameXCount: number,
    duration: number = 3,
    rotateLeftRight: boolean = false,
    initialDuration: number = 0
) => {
    const array: FrameOptions[][] = []
    for (let i = 0; i < frameXCount; i++) {
        var animation = { time: initialDuration + i * duration, frameX: i, frameY: frameY };

        if (direction === Direction.Left && rotateLeftRight) {
            animation['anchor'] = [1, 0];
            animation['skew'] = [0, Math.PI];
        }

        array.push([animation]);
    }
    array.push([{ time: frameXCount * duration }]);

    return array;
}

export function getFrameYForDirection(direction: Direction, map: number[]): number {
    switch (direction) {
        case Direction.Up:
            return map[0];
        case Direction.Right:
            return map[1];
        case Direction.Down:
            return map[2];
        case Direction.Left:
            return map[3];
    }

    return 0;
}

