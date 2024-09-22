import { Presets, RpgEvent, RpgPlayer } from '@rpgjs/server';
import { Skill } from '../../../../src/skills/decorators/Skill';
import { ShowAnimation } from '../../../../src/graphics/ShowAnimation';
import AquamarineGreen from './../../events/aoe-parts/AquamarineGreen';
import SquareAOESkillSpawner from './../../../../src/heroes/skills/SquareAOESkillSpawner';
import SquareAOEHitbox from './../../../../src/combat/hitbox/SquareAOEHitbox';
import { VictimsDetector } from '../../../../src/combat/hitbox/VictimsDetector';
import { KillableMob } from '../../../../src/enemies/mobs/KillableMob';
import { CombatReaction } from '../../../../src/combat/CombatReaction';

/** @ts-ignore */
@Skill({
    id: 'aquamarine-green-aoe-skill',
    name: 'Ritual of the wrath of the forest',
    description: 'Ritual of the wrath of the forest',
    spCost: 30,
    power: 10,
    variance: 10,
    hitRate: 1,
    icon: 'aquamarine-green-icon',
    cooldown: 5000,
    coefficient: {
        [Presets.INT]: 3,
    }
})
export default class AquamarineGreenAOESkill {
    onUse(attacker: RpgPlayer) {
        ShowAnimation.withReplace(attacker, 'skill');

        const map = attacker.getCurrentMap();

        if (!map) {
            return;
        }

        SquareAOESkillSpawner.spawn(attacker, {
            event: AquamarineGreen,
            radius: 80,
        });

        SquareAOEHitbox.ofPlayer(attacker, 192).subscribe({
            next: (hitbox) => VictimsDetector.detectMob(hitbox.otherPlayersCollision, attacker.id, attacker.getCurrentMap()?.id)
                .forEach((victim: KillableMob) => {
                    CombatReaction.onHit(attacker, victim, this);
                })
        });
    }
}
