import { RpgPlayer, inject } from "@rpgjs/server"
import { MovingHitboxFactory, MovingHitboxPositioning } from "../../combat/hitbox/MovingHitboxFactory"
import { VictimsDetector } from "../../combat/hitbox/VictimsDetector"
import { KillableMob } from "../../enemies/mobs/KillableMob"
import { CombatReaction } from "../../combat/CombatReaction"

export class MelePhysicalAttack {
    attack(attacker: RpgPlayer) {
        const hitboxFactory = inject(MovingHitboxFactory)

        attacker.getCurrentMap()?.createMovingHitbox([
            hitboxFactory.ofPlayer({
                player: attacker,
                hitbox: {
                    width: 32,
                    height: 32,
                },
                positioning: MovingHitboxPositioning.Forward,
            })
        ]).subscribe({
            next: (hitbox) => VictimsDetector.detectMob(hitbox.otherPlayersCollision, attacker.id, attacker.getCurrentMap()?.id)
                .forEach((victim: KillableMob) => CombatReaction.onHit(attacker, victim))
            ,
        })
    }
}
