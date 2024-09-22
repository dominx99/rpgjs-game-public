import { isNumber } from "../../../../../src/shared/utils/Utils";
import { MAX_PLAYER_LEVEL } from "../../../../heroes/src/utils/HeroConstants";
import { ItemEntity } from "../../../../inventory-extension/src/interfaces/ItemModel"
import { MAX_ITEM_LEVEL } from "../utils/constants";
import { IsItemUpgradable } from "./IsItemUpgradable";

export interface UpgradeChance {
    ofItem: (item: ItemEntity) => number;
    tryForItem: (item: ItemEntity) => boolean;
}

export const UpgradeChance = {
    ofItem: (item: ItemEntity) => {
        IsItemUpgradable.check(item);

        if (!isNumber(item.level) || !isNumber(item.requiredLevelToEquip)) {
            throw new Error('Item level and required level to equip is not a number');
        }

        const itemLevel = item.level;
        const requiredLevel = item.requiredLevelToEquip;
        const maxPlayerLevel = MAX_PLAYER_LEVEL;
        const maxItemLevel = MAX_ITEM_LEVEL;

        return Math.min(
            (maxItemLevel / (itemLevel + 1)) * (maxPlayerLevel / (requiredLevel)),
            95
        );
    },

    tryForItem: (item: ItemEntity): boolean => {
        const chance = UpgradeChance.ofItem(item) * 100;

        const random = Math.floor(Math.random() * 10000);

        return random <= chance;
    }
}
