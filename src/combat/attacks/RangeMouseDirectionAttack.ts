import { RpgEvent, RpgPlayer } from "@rpgjs/server";
import { Vector2d } from "@rpgjs/common";
import { VictimsDetector } from "../hitbox/VictimsDetector";
import { CombatReaction } from "../CombatReaction";
import { BasePhysicalAttack } from "../../../modules/heroes/src/interface/BasePhysicalAttack";

export interface RangeMouseDirectionAttackOptions {
    event: typeof RpgEvent;
    distance: number;
    skill: any;
}

export class RangeMouseDirectionAttack implements BasePhysicalAttack {
    options: RangeMouseDirectionAttackOptions;

    constructor(options: RangeMouseDirectionAttackOptions) {
        this.options = options;
    }

    attack(attacker: RpgPlayer, targetVector: Vector2d): void {
        const map = attacker.getCurrentMap();

        if (!map) {
            return;
        }

        const startPosition = attacker.position.copy();

        const startVector = new Vector2d(startPosition.x, startPosition.y);

        targetVector.subtract(startVector.copy());
        targetVector.normalize();
        targetVector.multiply(this.options.distance);
        targetVector.add(startVector);

        const events = map.createDynamicEvent({
            x: startPosition.x,
            y: startPosition.y,
            event: this.options.event,
        });

        const event = Object.values(events)[0];

        event.changeDirectionByNextPosition(targetVector);
        attacker.changeDirectionByNextPosition(targetVector);

        event
            .movePlayerToPosition(targetVector, {
                onComplete: () => event.remove(),
                onOutBounds: () => event.remove(),
            })
            .subscribe({
                next: () => {
                    const distance = event.position.distanceWith(startPosition);

                    if (distance > this.options.distance) {
                        event.remove();
                    }

                    if (event.tilesCollision.length > 0 || event.shapesCollision.length > 0) {
                        event.remove();
                    }

                    const mobs = VictimsDetector.detectMob(event.otherPlayersCollision, attacker.id, map.id);

                    if (mobs.length > 0) {
                        // TODO: show animation of hit

                        // event.showAnimation('energy-of-the-comet', 'hit');
                    }

                    mobs.forEach(victim => {
                        event.remove();
                        CombatReaction.onHit(attacker, victim, this.options.skill || null);
                    })
                },
                complete: () => event.remove(),
                error: () => event.remove(),
            });
    }
}
