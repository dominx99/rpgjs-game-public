import { RpgModule, RpgPlayer, RpgServerEngine } from "@rpgjs/server";
import { Potion, Sword } from "./fixtures/item";
import { RpgClientEngine } from "@rpgjs/client";
import { _beforeEach } from "../../../tests/unit-tests/specs/beforeEach";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TakeItem } from "../src/service/TakeItem";
import { NativeItems } from "../src/utils/NativeItems";
import { ItemType } from "../src/enum/ItemType";
import { clear } from "@rpgjs/testing";
import player from "../player";
import { BackpackItem, EquipItem, UnequipItem, UseItem } from "rpgjs-inventory";

/** @ts-ignore */
@RpgModule<RpgServer>({
    player,
    database: [
        Potion,
        Sword,
    ]
})
class RpgServerModule { }

let currentPlayer: RpgPlayer;
let client: RpgClientEngine
let server: RpgServerEngine

beforeEach(async () => {
    const res = await _beforeEach([{
        server: RpgServerModule
    }]);
    currentPlayer = res.player;
    currentPlayer.graphics = {
        base: [],
    };
    client = res.client;
    server = res.server;
});

describe('use item', () => {
    it('decrease quantity of item', async () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 5,
        });

        await UseItem.fromInventory(currentPlayer, { backpack: 'main', slot: 0 }, 'potion');
        const backpackItem = currentPlayer.inventory.getBackpackItem('main', 0) as BackpackItem;

        expect(backpackItem.itemId).toBeDefined();
        expect(backpackItem.nb).toBe(4);

        expect(NativeItems.findItemById(currentPlayer, backpackItem.itemId)?.nb).toBe(4);
    });

    it('does nothing if consumed item id does not match', async () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 10,
        });

        await UseItem.fromInventory(currentPlayer, { backpack: 'main', slot: 0 }, 'sword');

        const backpackItem = currentPlayer.inventory.getBackpackItem('main', 0) as BackpackItem;

        expect(backpackItem.nb).toBe(10);
    });
})

describe('equip item', () => {
    it('removes item from inventory after equip', async () => {
        TakeItem.toInventory(currentPlayer, {
            item: Sword,
            nb: 1,
        });

        await UseItem.fromInventory(currentPlayer, { backpack: 'main', slot: 0 }, 'sword');

        const backpackItem = currentPlayer.inventory.getBackpackItem('main', 0) as BackpackItem;

        expect(backpackItem).toBeNull();
    });
});

describe('inventory hooks', () => {
    it('call onEquip and onUnequip hooks', async () => {
        TakeItem.toInventory(currentPlayer, {
            item: Sword,
            nb: 1,
        });

        const spy = vi.spyOn(currentPlayer.server.module, 'emit');

        await EquipItem.byPlayer(currentPlayer, { backpack: 'main', slot: 0 });

        expect(spy).toHaveBeenCalled();

        UnequipItem.byPlayer(currentPlayer, ItemType.Weapon);

        expect(spy).toHaveBeenCalled();
    });
});

afterEach(() => {
    clear()
})
