import { RpgPlayer } from "@rpgjs/server";
import { Vector2d } from '@rpgjs/common';
import IceSpikesEvent from "../../../heroes/events/bullets/IceSpikesEvent";
import { SequenceAttack } from "../../../../src/combat/attacks/SequenceAttack";
import { TargetPositionCalculator } from "../../../../src/combat/calculations/TargetPositionCalculator";

export class IceSpikesSkillHandler {
    static use(attacker: RpgPlayer, mouseVector: Vector2d, skill: any) {
        const distance = 400;
        const handler = new SequenceAttack({
            event: IceSpikesEvent,
            distance,
            skill,
            interval: 40
        });

        const targetVector = TargetPositionCalculator.byMousePosition(attacker.position, {
            x: mouseVector.x,
            y: mouseVector.y,
        }, distance);

        handler.attack(attacker, targetVector);
    }
}
