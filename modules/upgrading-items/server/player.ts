import { RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";
import { UpgradingItemInteractionHooks } from "./src/UpgradingItemInteractionHooks";
import { upgradingItemSchema } from "./src/schemas/UpgradingItemSchemas";
import { Utils } from "@rpgjs/common";
import { UpgradingItemManager } from "./src/UpgradingItemManager";
import { ItemEntity } from "rpgjs-inventory";

declare module "@rpgjs/server" {
    export interface RpgPlayer {
        upgradingItem: ItemEntity
    }
}

const player: RpgPlayerHooks = {
    props: {
        upgradingItem: [upgradingItemSchema]
    },

    onJoinMap(player: RpgPlayer) {
        UpgradingItemInteractionHooks.init(player);
    }
}

Utils.applyMixins(RpgPlayer, [UpgradingItemManager]);

export default player;
