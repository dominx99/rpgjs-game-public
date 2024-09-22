import { RpgPlayer } from "@rpgjs/server";
import { Vector2d } from '@rpgjs/common';
import { RangeMouseDirectionAttack } from './../../../../src/combat/attacks/RangeMouseDirectionAttack';
import EnergyOfTheCometBullet from './../../../heroes/events/bullets/EnergyOfTheCometBullet';

export default class EnergyOfTheCometSkillHandler {
    static use(attacker: RpgPlayer, targetVector: Vector2d, skill: any) {
        const handler = new RangeMouseDirectionAttack({
            event: EnergyOfTheCometBullet,
            distance: 300,
            skill
        });

        handler.attack(attacker, targetVector);
    }
}
