import { RpgPlayer } from "@rpgjs/server";
import { TargetPositionCalculator } from "../../../../src/combat/calculations/TargetPositionCalculator";
import { PositionXY } from "@rpgjs/types";
import { WEAPON_DEFAULT_DISTANCE } from "../utils/HeroConstants";

export const PhysicalAttackInputHandler = (player: RpgPlayer, mousePosition: PositionXY) => {
    const map = player.getCurrentMap();

    if (!map) {
        return;
    }

    const distance = player.getEquippedWeapon()?.distance || WEAPON_DEFAULT_DISTANCE;
    const targetVector = TargetPositionCalculator.byMousePosition(player.position, mousePosition, distance);

    player.changeDirectionByNextPosition(targetVector);
    player.physicalAttack(player, targetVector);
}
