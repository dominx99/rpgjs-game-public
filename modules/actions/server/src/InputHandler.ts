import { RpgPlayer } from "@rpgjs/server";
import { Control, PositionXY } from "@rpgjs/types";
import SkillManager from "./../../../skills/src/SkillManager";
import { UseItem } from "rpgjs-inventory";
import { PhysicalAttackInputHandler } from "../../../heroes/src/service/PhysicalAttackInputHandler";

interface InputOptions {
    mousePosition: PositionXY,
    input: string,
}

export default class InputHandler {
    static async handle(player: RpgPlayer, { input, mousePosition }: InputOptions) {
        this.handlePhysicalAttack(player, { input, mousePosition });

        if (!input.startsWith('key')) {
            return;
        }

        input = input.replace('key', '');

        const shortcut = player.getShortcut(input);

        if (!shortcut) {
            return;
        }

        const action = player.getAction(shortcut);

        if (!action) {
            return;
        }

        if (action.type === 'skill') {
            SkillManager.useSkill(player, action.id, mousePosition);
        }

        if (action.type === 'item' && action.meta?.slot) {
            await UseItem.fromInventory(player, action.meta.slot, action.id);

            const backpackItem = player.inventory.getBackpackItemBySlot(action.meta.slot);

            if ((backpackItem?.nb || 0) > 0) {
                return;
            }

            player.removeActionByKey(action.key);
        }
    }

    static handlePhysicalAttack(player: RpgPlayer, { input, mousePosition }: InputOptions) {
        if (input !== Control.Attack) {
            return;
        }

        PhysicalAttackInputHandler(player, mousePosition);
    }
}
