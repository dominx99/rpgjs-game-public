import { RpgEvent, RpgMap, RpgPlayer, inject } from "@rpgjs/server";
import { Vector2d } from '@rpgjs/common';
import ThrowFreezingEvent from "../../../heroes/events/static-animations/ThrowFreezingEvent";
import { MovingHitboxFactory } from "../../../../src/combat/hitbox/MovingHitboxFactory";
import { VictimsDetector } from "../../../../src/combat/hitbox/VictimsDetector";
import { CombatReaction } from "../../../../src/combat/CombatReaction";
import { KillableMob } from "../../../../src/enemies/mobs/KillableMob";

interface ThrowAttackOptions {
    event: typeof RpgEvent,
}

export class ThrowFreezingSkillHandler {
    static options: ThrowAttackOptions;

    static use(attacker: RpgPlayer, targetVector: Vector2d, skill: any) {
        ThrowFreezingSkillHandler.options = {
            event: ThrowFreezingEvent,
        }

        const map = attacker.getCurrentMap();

        if (!map) {
            return;
        }

        const events = map.createDynamicEvent({
            event: ThrowFreezingEvent,
            x: targetVector.x,
            y: targetVector.y,
        });

        const event = Object.values(events)[0] as RpgEvent;

        setTimeout(() => {
            ThrowFreezingSkillHandler.hitbox(map, targetVector, attacker, skill);
        }, 500)

        // TODO: Remove timeout after fix => https://community.rpgjs.dev/d/250-rpgjs-v420/4
        setTimeout(() => {
            event.remove();
        }, 1500)
    }

    private static hitbox(map: RpgMap, targetVector: Vector2d, attacker: RpgPlayer, skill: any) {
        const hitboxFactory = inject(MovingHitboxFactory);

        // const id = 'square' + Math.round(Math.random() * 100).toString();
        // map.createShape({
        //     name: id,
        //     ...hitboxFactory.byPosition({
        //         hitbox: {
        //             width: ThrowFreezingSkillHandler.options.event.hitbox.width,
        //             height: ThrowFreezingSkillHandler.options.event.hitbox.height,
        //         },
        //         position: {
        //             x: targetVector.x,
        //             y: targetVector.y,
        //         },
        //     }),
        //     properties: {
        //         color: '#00ff00',
        //         collision: false,
        //     }
        // })
        //
        // setTimeout(() => {
        //     map.removeShape(id);
        // }, 1500);

        map?.createMovingHitbox([{
            ...hitboxFactory.byPosition({
                hitbox: {
                    width: ThrowFreezingSkillHandler.options.event.hitbox.width,
                    height: ThrowFreezingSkillHandler.options.event.hitbox.height,
                },
                position: {
                    x: targetVector.x,
                    y: targetVector.y,
                },
            }),
        }]).subscribe({
            next: hitbox => VictimsDetector.detectMob(hitbox.otherPlayersCollision, attacker.id, attacker.getCurrentMap()?.id)
                .forEach((victim: KillableMob) => {
                    CombatReaction.onHit(attacker, victim, skill);
                })
        });
    }
}
