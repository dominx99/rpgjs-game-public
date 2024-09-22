import { RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";
import { SkillSchema } from './../../src/skills/schemas/SkillSchemas'
import AquamarineGreenAOESkill from "../heroes/database/skills/AquamarineGreenAOESkill";
import EnergyOfTheCometSkill from "../heroes/database/skills/EnergyOfTheCometSkill";
import MagePhysicalAttack from "../heroes/database/physical-attacks/MagePhysicalAttack";
import ThrowFreezingSkill from "../heroes/database/skills/ThrowFreezingSkill";
import IceSpikesSkill from "../heroes/database/skills/IceSpikesSkill";

declare module "@rpgjs/server" {
    export interface RpgPlayer {
        isSkillsGuiOpened: boolean
    }
}

const player: RpgPlayerHooks = {
    props: {
        skills: [SkillSchema]
    },

    onAuthSuccess(player: RpgPlayer) {
        player.isSkillsGuiOpened = false;

        /** TODO: Remove this */
        if (Object.entries(player.skills).length === 0) {
            if (!player.getSkill(MagePhysicalAttack)) {
                player.learnSkill(MagePhysicalAttack);
            }
            if (!player.getSkill(EnergyOfTheCometSkill)) {
                player.learnSkill(EnergyOfTheCometSkill);
            }
            if (!player.getSkill(AquamarineGreenAOESkill)) {
                player.learnSkill(AquamarineGreenAOESkill);
            }
            if (!player.getSkill(ThrowFreezingSkill)) {
                player.learnSkill(ThrowFreezingSkill);
            }
            if (!player.getSkill(IceSpikesSkill)) {
                player.learnSkill(IceSpikesSkill);
            }
        }
    },

    onInput(player: RpgPlayer, { input }) {
        if (input === 'skills') {
            if (player.isSkillsGuiOpened) {
                player.gui('skills-gui').close();
                player.isSkillsGuiOpened = false;
            } else {
                player.gui('skills-gui').open();
                player.isSkillsGuiOpened = true;
            }
        }
    },
}

export default player;
