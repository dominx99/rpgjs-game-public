import { Input, RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";
import { Utils } from '@rpgjs/common';
import ShortcutManager from "./src/ShortcutManager";
import { ActionManager, ActionKey } from "./src/ActionManager";
import { actionSchema } from './src/ActionSchemas';
import ActionsLoader from "./src/ActionsLoader";
import ActionInteractionHooks from "./src/ActionInteractionHooks";

declare module "@rpgjs/server" {
    interface RpgPlayer extends ActionManager, ShortcutManager {}
}

export const player: RpgPlayerHooks = {
    props: {
        actions: [actionSchema],
    },

    onAuthSuccess(player: RpgPlayer) {
        player.gui('action-bar-gui').open();

        const actions = Object.values(player.actions);

        if (actions.length <= 0) {
            return;
        }

        ActionsLoader.load(player);
    },
    onJoinMap(player: RpgPlayer) {
        ActionInteractionHooks.init(player);
    }
}

const originalInitializeMethod = RpgPlayer.prototype.initialize;
RpgPlayer.prototype.initialize = function() {
    originalInitializeMethod.apply(this);

    this.actions = [];
    this.shortcuts = {};
    this.defaultShortcuts = {
        [Input.One]: ActionKey.One,
        [Input.Two]: ActionKey.Two,
        [Input.Three]: ActionKey.Three,
        [Input.Four]: ActionKey.Four,
        [Input.Five]: ActionKey.Five,
        [Input.Six]: ActionKey.Six,
        [Input.Seven]: ActionKey.Seven,
    };
}

Utils.applyMixins(RpgPlayer, [
    ShortcutManager,
    ActionManager
]);
