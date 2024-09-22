import { RpgPlayer } from "@rpgjs/server";
import { ItemUpgrader } from "./ItemUpgrader";
import { UpgradeChance } from "./service/UpgradeChance";

export interface UpgradeItemAction {
    itemId: string,
}

export enum UpgradingItemHooks {
    onUpgrade = 'item.upgrade',
}

export class UpgradingItemInteractionHooks {
    static upgrader: ItemUpgrader;

    static initializeUpgrader() {
        if (!this.upgrader) {
            this.upgrader = new ItemUpgrader(UpgradeChance);
        }
    }

    static init(player: RpgPlayer) {
        this.initializeUpgrader();

        player.off(UpgradingItemHooks.onUpgrade);
        player.on(UpgradingItemHooks.onUpgrade, (action: UpgradeItemAction) => this.onUpgrade(player, action));
    }

    static onUpgrade(player: RpgPlayer, action: UpgradeItemAction) {
        this.upgrader.upgrade(player, action.itemId);
    }
}
