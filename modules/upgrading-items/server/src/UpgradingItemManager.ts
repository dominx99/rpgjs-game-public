import { ItemEntity } from "rpgjs-inventory";

export interface UpgradingItemManager {
    upgradingItem: ItemEntity;

    setUpgradingItem(item: ItemEntity): void;
}

export class UpgradingItemManager {
    upgradingItem: ItemEntity

    setUpgradingItem(item: ItemEntity) {
        this.upgradingItem = item;
    }
}
