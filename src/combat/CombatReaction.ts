import { RpgPlayer, inject } from "@rpgjs/server";
import { GainExperience } from "../collect/gains/GainExperience";
import { GainItem } from "../collect/gains/GainItem";
import { KillableMob } from "../enemies/mobs/KillableMob";
import { GainGold } from "../collect/gains/GainGold";
import { HideUnitInformation } from "../../modules/unit-information/server/src/service/HideUnitInformation";
import { OnHitEffects } from "./service/OnHitEffects";

export type SkillClass = {
    new(...args: any[]): any;
};

export class CombatReaction {
    static onHit(attacker: RpgPlayer, victim: KillableMob, skill?: any) {
        const dealt = victim.applyDamage(attacker, skill)

        if (skill) {
            inject(OnHitEffects).onHit(attacker, victim, skill);
        }
        victim.popText({
            text: Math.round(dealt.damage).toString(),
            color: 0xff1010,
        });

        if (victim.hp <= 0) {
            GainExperience.gainExp(attacker, victim);
            GainItem.drop(victim, attacker);
            GainGold.gainForMob(attacker, victim);
            inject(HideUnitInformation).hide(attacker, victim);
        } else {
            victim.physicalAttackLoop(attacker);
            victim.follow(attacker);
            victim.onHit();
        }
    }
}
