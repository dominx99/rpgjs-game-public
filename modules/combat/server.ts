import { RpgServerEngine } from "@rpgjs/server";

import { Presets } from "@rpgjs/server";

const { ATK, INT, PDEF, SDEF } = Presets;

export default {
    onStart(engine: RpgServerEngine) {
        engine.damageFormulas.damageSkill = (a, b, skill) => {
            let damage = (skill.power || 0)
                + (a[ATK] * (skill.coefficient?.[ATK] || 0))
                + (a[INT] * (skill.coefficient?.[INT] || 0))
            ;

            if (damage > 0) {
                damage -= b[PDEF] * (skill.coefficient?.[PDEF] || 0)
                damage -= b[SDEF] * (skill.coefficient?.[SDEF] || 0)
                damage = Math.max(damage, 0)
            }

            return damage;
        }
        engine.damageFormulas.damagePhysic = (a, b) => {
            return a[ATK] - b[PDEF] / 2;
        }
    }
}
