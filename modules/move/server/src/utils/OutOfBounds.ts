import { RpgMap } from "@rpgjs/server";
import { PositionXY } from "@rpgjs/types";
import { Hitbox } from "../../../../../src/spawn/Spawner";

export class OutOfBounds {
    isOutOfBounds(map: RpgMap, position: PositionXY, hitbox: Hitbox) {
        const xk = position.x < map?.widthPx ? -5 : 5;
        const yk = position.y < map?.heightPx ? -5 : 5;

        const x = position.x + (hitbox.width / 2) + xk;
        const y = position.y + (hitbox.height / 2) + yk;

        if (x <= 0 || x >= map.widthPx) {
            return true;
        }

        if (y <= 0 || y >= map.heightPx) {
            return true;
        }

        return false;
    }
}
