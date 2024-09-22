import { RpgMap, RpgPlayer, inject } from "@rpgjs/server";
import { MovingHitboxFactory, MovingHitboxPositioning } from "../../combat/hitbox/MovingHitboxFactory";
import { VictimsDetector } from "../../combat/hitbox/VictimsDetector";

export interface AOEAttackOptions {
    graphic: string;
    animationName: string;
}

export class AOEAttack {
    options: AOEAttackOptions;

    constructor(options: AOEAttackOptions) {
        this.options = options;
    }

    attack(map: RpgMap, attacker: RpgPlayer) {
        attacker.showAnimation(this.options.graphic, this.options.animationName, false);

        const hitboxFactory = inject(MovingHitboxFactory);

        map.createMovingHitbox([
            hitboxFactory.ofPlayer({
                player: attacker,
                hitbox: {
                    width: 96,
                    height: 96,
                },
                positioning: MovingHitboxPositioning.Center
            })
        ]).subscribe({
            next: (hitbox) => VictimsDetector
                .detectPlayer(hitbox.otherPlayersCollision, attacker.id, attacker.getCurrentMap()?.id)
                .forEach((victim: RpgPlayer) => victim.applyDamage(attacker))
        });

        // attacker.getCurrentMap()?.createShape({
        //     name: 'green-ball-explosion' + Math.round(Math.random() * 100).toString(),
        //     ...MovingHitbox.ofPlayer({
        //         player: attacker,
        //         hitbox: {
        //             width: 96,
        //             height: 96,
        //         },
        //         positioning: MovingHitboxPositioning.Center
        //     }),
        //     properties: {
        //         color: '#00ff00',
        //     }
        // })
    }
}
