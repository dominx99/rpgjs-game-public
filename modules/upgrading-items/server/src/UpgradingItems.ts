export class UpgradingItems {
    static UPGRADING_ITEM_IDS = [
        'upgrading-scroll-1',
        'upgrading-scroll-2',
        'upgrading-scroll-3',
    ];

    static isUpgradingItemById(itemId: string) {
        return UpgradingItems.UPGRADING_ITEM_IDS.includes(itemId);
    }
}
