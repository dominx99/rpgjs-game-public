import { RpgModule, RpgPlayer, RpgServer, RpgServerEngine } from "@rpgjs/server";
import { clear } from "@rpgjs/testing";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { _beforeEach } from "../../../tests/unit-tests/specs/beforeEach";
import { TakeItem } from "../../inventory-extension/src/service/TakeItem";
import { Backpack, Equipment, Inventory } from "rpgjs-inventory";
import player from "../server/player";
import { ItemUpgrader } from "../server/src/ItemUpgrader";
import { Potion, Sword } from "../../inventory-extension/__test__/fixtures/item";
import UpgradingScroll1 from "../../items/database/scrolls/UpgradingScroll1";
import UpgradingScroll2 from "../../items/database/scrolls/UpgradingScroll2";
import UpgradingScroll3 from "../../items/database/scrolls/UpgradingScroll3";
import { DatabaseManager } from "../../save/src/DatabaseManager";
import { Utils } from '@rpgjs/common';
import { UpgradeChanceFake } from "./UpgradeChanceFake";
import { NativeInventoryItem } from "../../inventory-extension/src/interfaces/ItemModel";

let currentPlayer: RpgPlayer;

@RpgModule<RpgServer>({
    player,
    database: [
        Potion,
        Sword,
        UpgradingScroll1,
        UpgradingScroll2,
        UpgradingScroll3,
    ],
})
class RpgServerModule { }

Utils.applyMixins(RpgServerEngine, [DatabaseManager]);

let upgrader: ItemUpgrader;

beforeEach(async () => {
    const res = await _beforeEach([{
        server: RpgServerModule,
    }]);

    currentPlayer = res.player;
    currentPlayer.inventory = new Inventory([new Backpack('main', 32)], new Equipment());
    upgrader = new ItemUpgrader(UpgradeChanceFake);
});

describe('Possibility to upgrade an item', () => {
    it('is not possible to upgrade item you do not owe', () => {
        expect(() => upgrader.upgrade(currentPlayer, 'potion')).toThrowError('You do not have this item');
    });

    it('is not possible to upgrade non upgradable item', () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 1
        });

        expect(() => upgrader.upgrade(currentPlayer, 'potion')).toThrowError('Cannot upgrade this item');
    });

    it('is possible to upgrade an item', () => {
        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll1,
            nb: 1,
        });
        TakeItem.toInventory(currentPlayer, {
            item: Sword,
            nb: 1
        });

        expect(currentPlayer.getItem(UpgradingScroll1).nb).toBe(1);
        expect(currentPlayer.inventory.getBackpackItemBySlot({ backpack: 'main', slot: 0 })?.nb).toBe(1);

        upgrader.upgrade(currentPlayer, 'sword');

        const item = currentPlayer.getItem('sword') as NativeInventoryItem;

        expect(item.item.level).toBe(1);

        expect(item.item.atk).toBe(Math.round(50 * 1.05));

        expect(currentPlayer.getItem(UpgradingScroll1)).toBeUndefined();
        expect(currentPlayer.inventory.getBackpackItemBySlot({ backpack: 'main', slot: 0 })).toBeNull();
    });

    it('should be possible to upgrade item multiple times', () => {
        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll1,
            nb: 5,
        })
        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll2,
            nb: 3,
        })
        TakeItem.toInventory(currentPlayer, {
            item: Sword,
            nb: 1
        });

        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');

        const item = currentPlayer.getItem('sword') as NativeInventoryItem;

        expect(item.item.level).toBe(5);
        expect(item.item.atk).toBe(65);

        expect(currentPlayer.getItem(UpgradingScroll1)).toBeUndefined();
        expect(currentPlayer.getItem(UpgradingScroll2).nb).toBe(1);
    });

    it('should be possible to upgrade item to specific threshold level', () => {
        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll1,
            nb: 10,
        });
        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll2,
            nb: 7,
        });
        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll3,
            nb: 4,
        });
        TakeItem.toInventory(currentPlayer, {
            item: Sword,
            nb: 1
        });

        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        expect(() => upgrader.upgrade(currentPlayer, 'sword')).toThrowError('Item is already at max level');

        const item = currentPlayer.getItem('sword') as NativeInventoryItem;

        expect(item.item.level).toBe(9);
        expect(item.item.atk).toBe(79);

        expect(currentPlayer.getItem(UpgradingScroll1).nb).toBe(4);
        expect(currentPlayer.getItem(UpgradingScroll2).nb).toBe(1);
        expect(currentPlayer.getItem(UpgradingScroll3).nb).toBe(1);
    });

    it('should not be possible to upgrade item if you do not have enough scrolls', () => {
        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll1,
            nb: 1
        });

        TakeItem.toInventory(currentPlayer, {
            item: Sword,
            nb: 1
        });

        upgrader.upgrade(currentPlayer, 'sword');
        expect(() => upgrader.upgrade(currentPlayer, 'sword')).toThrowError('You do not have required items to upgrade');

        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll1,
            nb: 8
        });

        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');

        expect(() => upgrader.upgrade(currentPlayer, 'sword')).toThrowError('You do not have required items to upgrade');

        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll2,
            nb: 4
        });

        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');
        upgrader.upgrade(currentPlayer, 'sword');

        expect(() => upgrader.upgrade(currentPlayer, 'sword')).toThrowError('You do not have required items to upgrade');
        TakeItem.toInventory(currentPlayer, {
            item: UpgradingScroll3,
            nb: 3
        });

        upgrader.upgrade(currentPlayer, 'sword');

        expect(currentPlayer.getItem(UpgradingScroll1).nb).toBe(3);
        expect(currentPlayer.getItem(UpgradingScroll2)).toBeUndefined();
        expect(currentPlayer.getItem(UpgradingScroll3).nb).toBe(2);
    });
});

afterEach(() => {
    clear();
});
