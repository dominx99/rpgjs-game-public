import { RpgPlayer } from "@rpgjs/server";
import { isNil, isNumber } from "../../../../src/shared/utils/Utils";
import { NextLevelParamCalculator } from "./service/NextLevelParamCalculator";
import { CanUpgradeItem } from "./service/CanUpgradeItem";
import { RemoveNeededItems } from "./service/RemoveNeededItems";
import { NativeInventoryItem, ItemEntity } from "../../../inventory-extension/src/interfaces/ItemModel";
import { UpgradeChance } from "./service/UpgradeChance";
import { UpgradingNotifier } from "./service/UpgradingNotifier";

export class ItemUpgrader {
    private upgradeChance: UpgradeChance;

    constructor(UpgradeChance: UpgradeChance) {
        this.upgradeChance = UpgradeChance;
    }

    upgrade(player: RpgPlayer, itemId: string) {
        if (!player.hasItem(itemId) || !player.inventory.hasItem(itemId)) {
            throw new Error('You do not have this item');
        }

        let item = player.getItem(itemId) as NativeInventoryItem;

        if (!isNumber(item.item.level)) {
            throw new Error('Cannot upgrade this item');
        }

        if (item.item.level >= 9) {
            throw new Error('Item is already at max level');
        }

        CanUpgradeItem.check(player, item);
        RemoveNeededItems.fromInventory(player, item);

        item = player.getItem(itemId) as NativeInventoryItem;

        if (!isNumber(item.item.level) || isNil(item.item.id)) {
            throw new Error('Something went wrong!');
        }

        const success = this.upgradeChance.tryForItem(item.item);

        if (!success) {
            UpgradingNotifier.failed(player, item.item);

            return;
        }

        item.item.level++;

        Object.entries(NextLevelParamCalculator).forEach(([key, calculator]) => {
            if (isNil(item.item[key])) {
                return;
            }

            item.item[key] = calculator(item.item[key]);
        });

        player.server.addInDatabaseInternal(item.item.id, item.item);

        UpgradingNotifier.success(player, item.item);
    }
}
