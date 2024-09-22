import { RpgPlayer } from "@rpgjs/server";
import { Vector2d } from "@rpgjs/common";

export interface BasePhysicalAttack {
    attack(attacker: RpgPlayer, targetVector: Vector2d): void;
}
