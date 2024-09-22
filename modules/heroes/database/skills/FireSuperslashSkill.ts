import { Presets, RpgPlayer, inject } from '@rpgjs/server';
import { ShowAnimation } from './../../../../src/graphics/ShowAnimation'
import { MovingHitboxFactory, MovingHitboxPositioning } from './../../../../src/combat/hitbox/MovingHitboxFactory';
import { VictimsDetector } from './../../../../src/combat/hitbox/VictimsDetector';
import { KillableMob } from '../../../../src/enemies/mobs/KillableMob';
import { CombatReaction } from './../../../../src/combat/CombatReaction'
import { Skill } from './../../../../src/skills/decorators/Skill';

/** @ts-ignore */
@Skill({
    name: 'Fire superslash',
    description: 'Smash',
    spCost: 10,
    power: 5,
    coefficient: {
        [Presets.ATK]: 2
    },
    variance: 10,
    hitRate: 1,
    cooldown: 1250,
    icon: 'skill1',
})
export default class FireSuperslashSkill {
    onUse(attacker: RpgPlayer) {
        ShowAnimation.withReplace(attacker, 'attack', ['bigslash', 'fire-superslash']);

        const hitboxFactory = inject(MovingHitboxFactory);

        attacker.getCurrentMap()?.createMovingHitbox([
            hitboxFactory.ofPlayer({
                player: attacker,
                hitbox: {
                    width: 32 * 3,
                    height: 80 * 3,
                },
                positioning: MovingHitboxPositioning.Forward,
            })
        ]).subscribe({
            next: hitbox => VictimsDetector.detectMob(hitbox.otherPlayersCollision, attacker.id, attacker.getCurrentMap()?.id)
                .forEach((victim: KillableMob) => {
                    CombatReaction.onHit(attacker, victim, this);
                })
        })
    }
}
