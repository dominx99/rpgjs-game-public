import { Skill } from "../../../../src/skills/decorators/Skill";
import { Presets } from "@rpgjs/server";

// @ts-ignore
@Skill({
    id: 'mage-physical-attack',
    name: 'Physical Attack',
    description: 'Mage Physical Attack treated as ability damage',
    spCost: 0,
    power: 0,
    variance: 0,
    hitRate: 1,
    coefficient: {
        [Presets.ATK]: 1,
        [Presets.SDEF]: 0.5,
    }
})
export default class MagePhysicalAttack {
}
