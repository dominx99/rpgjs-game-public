import { Move, RpgEvent, RpgMap, RpgPlayer, inject } from "@rpgjs/server";
import { MovingHitboxFactory, MovingHitboxPositioning } from "../../combat/hitbox/MovingHitboxFactory";
import { VictimsDetector } from "../../combat/hitbox/VictimsDetector";
import { KillableMob } from "../mobs/KillableMob";

export interface PhysicalAttackOptions {
    graphics: string[];
    animationName: string;
}

export class PhysicalAttack {
    options: PhysicalAttackOptions;

    constructor(options: PhysicalAttackOptions) {
        this.options = options;
    }

    attack(map: RpgMap, attacker: RpgPlayer, victim: RpgPlayer) {
        attacker.moveRoutes([Move.turnTowardPlayer(victim)]);
        attacker.showAnimation(this.options.graphics, this.options.animationName, true);

        const hitboxFactory = inject(MovingHitboxFactory);

        map.createMovingHitbox([
            hitboxFactory.ofPlayer({
                player: attacker,
                hitbox: {
                    width: 32,
                    height: 32,
                },
                positioning: MovingHitboxPositioning.Forward
            })
        ]).subscribe({
            next: (hitbox) => VictimsDetector
                .detectPlayer(hitbox.otherPlayersCollision, attacker.id, attacker.getCurrentMap()?.id)
                .forEach((victim: RpgPlayer) => victim.applyDamage(attacker))
        });
    }
}
