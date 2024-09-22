import { PositionXY } from "@rpgjs/types";
import { Vector2d } from "@rpgjs/common";

export const TargetPositionCalculator = {
    byMousePosition(playerPosition: PositionXY, mousePosition: PositionXY, distance: number): Vector2d {
        const startVector = new Vector2d(playerPosition.x, playerPosition.y);
        const endVector = new Vector2d(mousePosition.x, mousePosition.y);
        const targetVector = endVector.copy().subtract(startVector.copy());
        targetVector.normalize();
        targetVector.multiply(distance);
        targetVector.add(startVector);

        return targetVector;
    }
}
