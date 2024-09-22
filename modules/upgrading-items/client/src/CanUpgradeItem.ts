import { isNil } from "../../../../src/shared/utils/Utils";
import { ItemContract } from "../../../inventory-extension/src/contracts/ItemContract";

export class CanUpgradeItem {
    static check(item: ItemContract) {
        return Boolean(item.equippable) && !isNil(item.level) && item.level >= 0 && item.level < 9;
    }
}
