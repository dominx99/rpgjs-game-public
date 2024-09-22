import { isNil } from "../../../../../src/shared/utils/Utils";
import { ItemEntity } from "../../../../inventory-extension/src/interfaces/ItemModel";
import { MAX_ITEM_LEVEL } from "../utils/constants";

export const IsItemUpgradable = {
    check: (item: ItemEntity) => {
        if (isNil(item.level)) {
            throw new Error("This item is not upgradable");
        }

        if (item.level >= MAX_ITEM_LEVEL) {
            throw new Error("This item is already at max level");
        }
    }
}
