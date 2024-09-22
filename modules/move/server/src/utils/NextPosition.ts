import { Vector2d, Vector2dZero } from "@rpgjs/common/lib/Vector2d";

export class NextPosition {
    computeNextPosition(nextPosition: Vector2d, target: Vector2d, speed: number): Vector2d {
        const pullDistance = target.distanceWith(nextPosition)
        if (pullDistance <= speed) {
            return nextPosition.set(target)
        }
        const pull = (target.copy().subtract(nextPosition)).multiply((1 / pullDistance))
        const totalPush = new Vector2dZero()

        pull
            .add(totalPush)
            .normalize()

        return nextPosition.add(pull.multiply(speed))
    }
}
