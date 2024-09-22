import { RpgPlayer } from "@rpgjs/server";
import { BasePhysicalAttack } from "./interface/BasePhysicalAttack";
import { Vector2d } from "@rpgjs/common";
import { ShowAnimation } from "../../../src/graphics/ShowAnimation";
import { ItemEntity } from "../../inventory-extension/src/interfaces/ItemModel";
import { MelePhysicalAttack } from "../../../src/heroes/attacks/MelePhysicalAttack";
import { WeaponType } from "../../inventory-extension/src/enum/WeaponType";
import { RangeMouseDirectionAttack } from "../../../src/combat/attacks/RangeMouseDirectionAttack";
import { Slowdown } from "../../effects/server/src/services/Slowdown";
import { SpeedEffectIdentifier } from "../../effects/server/src/enums/SpeedEffectIdentifier";
import { WEAPON_DEFAULT_DISTANCE } from "./utils/HeroConstants";
import { Bullet } from "../../inventory-extension/src/enum/BulletType";

export class PlayerPhysicalAttackManager {
    physicalAttack(attacker: RpgPlayer, targetVector: Vector2d): void {
        const weapon = attacker.getEquippedWeapon();
        const animationName = weapon?.attackAnimation || 'attack';
        const animationGraphic = weapon?.attackGraphic || 'bigslash';
        const skill = this.getPhysicalAttackSkill(attacker, weapon);

        ShowAnimation.withReplace(attacker, animationName, animationGraphic);

        const slowdown = Slowdown.fromPercentage(weapon?.slowdownOnHitPercentage || 100);
        attacker.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, slowdown, 150);

        this.getPhysicalAttackHandler(weapon, skill).attack(attacker, targetVector);
    }

    getPhysicalAttackSkill(attacker: RpgPlayer, weapon: ItemEntity | null) {
        const skill = weapon?.physicalAttackSkill;

        if (!skill) {
            return null;
        }

        return attacker.getSkill(skill);
    }

    getPhysicalAttackHandler(weapon: ItemEntity | null, skill: any): BasePhysicalAttack {
        if (weapon?.weaponType === WeaponType.ONE_HANDED) {
            return new MelePhysicalAttack();
        }

        if (weapon?.weaponType === WeaponType.BOW && weapon.bullet) {
            return new RangeMouseDirectionAttack({
                event: Bullet.get(weapon?.bullet),
                distance: weapon.distance || WEAPON_DEFAULT_DISTANCE,
                skill: skill,
            });
        }

        return new MelePhysicalAttack();
    }
}
