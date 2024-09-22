import { ItemClass } from "../../../inventory-extension/src/interfaces/ItemClass";
import UpgradingScroll1 from "../../../items/database/scrolls/UpgradingScroll1";
import UpgradingScroll2 from "../../../items/database/scrolls/UpgradingScroll2";
import UpgradingScroll3 from "../../../items/database/scrolls/UpgradingScroll3";

export interface ItemNeededToUpgrade {
    item: ItemClass,
    nb: number
}

export const NeededToUpgradeItem = {
    scrolls: (currentItemLevel: number): Array<ItemNeededToUpgrade> => {
        switch (currentItemLevel) {
            case 0:
            case 1:
            case 2:
                return [
                    {
                        item: UpgradingScroll1,
                        nb: 1
                    },
                ]
            case 3:
            case 4:
            case 5:
                return [
                    {
                        item: UpgradingScroll1,
                        nb: 1
                    },
                    {
                        item: UpgradingScroll2,
                        nb: 1,
                    }
                ]
            case 6:
            case 7:
            case 8:
                return [
                    {
                        item: UpgradingScroll2,
                        nb: 1
                    },
                    {
                        item: UpgradingScroll3,
                        nb: 1
                    },
                ]
        }

        return [];
    },
    all: (currentItemLevel: number): Array<ItemNeededToUpgrade> => {
        return [
            ...NeededToUpgradeItem.scrolls(currentItemLevel),
        ]
    }
}
