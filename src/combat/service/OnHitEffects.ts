import { RpgPlayer } from "@rpgjs/server";
import { SkillStateOption } from "../../skills/decorators/Skill";
import { SpeedEffectIdentifier } from "../../../modules/effects/server/src/enums/SpeedEffectIdentifier";
import { ExtendedEffect } from "../../../modules/effects/client/src/enums/Effect";

export class OnHitEffects {
    onHit(attacker: RpgPlayer, victim: RpgPlayer, skill: any) {
        if (!skill.addStates) {
            return;
        }

        const addStates = skill.addStates as SkillStateOption[];

        addStates.forEach(state => {
            // if rate is lower than 1 then it throws an error in case of failure
            try {
                victim.addStateWithDuration(state.state, state.rate, state.duration);
            } catch (e) {
            }

            this.applyEffects(victim, state);
        });
    }

    applyEffects(victim: RpgPlayer, stateToPut: SkillStateOption) {
        victim.states.forEach(state => {
            if (state.additionalEffects.includes(ExtendedEffect.FREEZE)) {
                victim.addSpeedEffect(SpeedEffectIdentifier.FREEZING, 0, stateToPut.duration);
            }
        })
    }
}
