import { RpgEvent, RpgPlayer, inject } from "@rpgjs/server";
import { Vector2d } from "@rpgjs/common";
import { VictimsDetector } from "../hitbox/VictimsDetector";
import { CombatReaction } from "../CombatReaction";
import { NextPosition } from "../../../modules/move/server/src/utils/NextPosition";
import { OutOfBounds } from "../../../modules/move/server/src/utils/OutOfBounds";
import { TargetPositionCalculator } from "../calculations/TargetPositionCalculator";

export interface SequenceAttackOptions {
    event: typeof RpgEvent;
    distance: number;
    skill: any;
    interval: number;
}

export class SequenceAttack {
    options: SequenceAttackOptions;

    constructor(options: SequenceAttackOptions) {
        this.options = options;
    }

    attack(attacker: RpgPlayer, targetVector: Vector2d): void {
        const map = attacker.getCurrentMap();

        if (!map) {
            return;
        }

        const startPosition = attacker.position.copy();

        let startVector = new Vector2d(startPosition.x, startPosition.y);

        // without that a lot of skills would not detect mob that stands very close to player
        startVector = TargetPositionCalculator.byMousePosition(attacker.position, {
            x: targetVector.x,
            y: targetVector.y,
        }, -10);

        const vectors = this.prepareEventVectors(startVector, targetVector)
            .filter(vector => !inject(OutOfBounds).isOutOfBounds(map, vector, this.options.event.hitbox));

        let stop = false;

        attacker.changeDirectionByNextPosition(targetVector);

        vectors.forEach((vector, i) => {
            setTimeout(() => {
                if (stop) {
                    return;
                }

                const event = Object.values(map.createDynamicEvent({
                    x: vector.x,
                    y: vector.y,
                    event: this.options.event,
                }))[0];

                if (event.tilesCollision.length > 0) {
                    event.remove();

                    stop = true;
                }

                // const pos = inject(PositionByType).getCenterByPosition({
                //     x: vector.x,
                //     y: vector.y,
                // }, {
                //     width: this.options.event.hitbox.width,
                //     height: this.options.event.hitbox.height,
                // })
                //
                // const id = 'seq' + Math.round(Math.random() * 100).toString();
                // map.createShape({
                //     x: pos.x,
                //     y: pos.y,
                //     width: this.options.event.hitbox.width,
                //     height: this.options.event.hitbox.height,
                //     name: id,
                //     properties: {
                //         color: '#ff0000',
                //     }
                // });
                // setTimeout(() => {
                //     map.removeShape(id);
                // }, 500);

                VictimsDetector.detectMob(event.otherPlayersCollision, attacker.id, attacker.getCurrentMap()?.id)
                    .forEach(victim => CombatReaction.onHit(attacker, victim, this.options.skill))
                    ;

                // TODO: remove this when https://community.rpgjs.dev/d/250-rpgjs-v420 is fixed
                setTimeout(() => {
                    event.remove();
                }, 550)
            }, i * this.options.interval);
        });
    }

    private prepareEventVectors(startVector: Vector2d, targetVector: Vector2d): Vector2d[] {
        const nextPosition = inject(NextPosition);
        const density = Math.round(this.options.event.hitbox.height / Math.sqrt(2));
        const nbEvents = Math.round(this.options.distance / density);

        const vectors: Vector2d[] = [];

        let currentVector = startVector.copy();

        for (let i = 0; i < nbEvents; i++) {
            const nextVector = nextPosition.computeNextPosition(currentVector, targetVector.copy(), density);

            vectors.push(nextVector);

            currentVector = nextVector.copy();
        }

        return vectors;
    }
}
