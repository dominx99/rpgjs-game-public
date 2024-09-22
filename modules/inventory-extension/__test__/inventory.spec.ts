import { RpgPlayer, RpgModule, RpgServer, RpgMap } from '@rpgjs/server';
import { RpgClient, RpgClientEngine } from '@rpgjs/client';
import { _beforeEach } from '../../../tests/unit-tests/specs/beforeEach';
import { afterEach, beforeEach, describe, expect, it, test } from 'vitest';
import { TakeItem } from '../src/service/TakeItem';
import { Potion, Sword, backpackItem, potion } from './fixtures/item';
import { clear } from '@rpgjs/testing';
import { DropItem } from '../src/service/DropItem';
import { SpawnItem } from '../src/service/SpawnItem';
/** @ts-ignore */
import rpgNotification from './../../../tests/unit-tests/shared/RpgNotificationMock.vue';
import player from '../player';

/** @ts-ignore */
@RpgModule<RpgServer>({
    player,
    database: [
        Potion,
        Sword,
    ],
})
class RpgServerModule { }

/** @ts-ignore */
@RpgModule<RpgClient>({
    gui: [
        rpgNotification
    ]
})
class RpgClientModule { }

let currentPlayer: RpgPlayer;
let client: RpgClientEngine;
let map: RpgMap;

beforeEach(async () => {
    const res = await _beforeEach([{
        server: RpgServerModule,
        client: RpgClientModule
    }]);
    currentPlayer = res.player;
    client = res.client;
    map = currentPlayer.getCurrentMap() as RpgMap;
});

describe('Inventory extension', () => {
    test('should add an item', () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 3
        });

        const nativeItem = currentPlayer.items.find(item => item.item.id === 'potion');
        expect(nativeItem?.nb).toBe(3);

        expect(currentPlayer.inventory.getBackpackItem('main', 0)?.itemId).toBe('potion');
        expect(currentPlayer.inventory.getBackpackItem('main', 0)?.nb).toBe(3);
    });

    test('do not add item with negative quantity', () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: -5
        });

        const nativeItem = currentPlayer.items.find(item => item.item.id === 'potion');

        expect(nativeItem).toBeUndefined();
        expect(currentPlayer.inventory.getBackpack('main').items).toHaveLength(0);
    });

    test('Add items over the inventory space', () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: (32 * 200) + 5
        });

        const nativeItem = currentPlayer.items.find(item => item.item.id === 'potion');
        expect(nativeItem?.nb).toBe(32 * 200);

        expect(currentPlayer.inventory.getBackpack('main').items).toHaveLength(32);
    });

    test('Item is stacked to first same item', () => {
        currentPlayer.inventory.addBackpackItemToSlot(backpackItem(potion({ nb: 50 }), 1), { backpack: 'main', slot: 1 });
        currentPlayer.inventory.addBackpackItemToSlot(backpackItem(potion({ nb: 30 }), 0), { backpack: 'main', slot: 0 });

        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 30,
        })

        expect(currentPlayer.inventory.getBackpackItem('main', 0)?.nb).toBe(60);
    })
});

describe('drop item from inventory', () => {
    test('item on ground', () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: (3 * 200) + 30
        });

        DropItem.fromInventory({
            player: currentPlayer,
            amountToDrop: 45,
            slot: {
                backpack: 'main',
                slot: 0,
            }
        });

        expect(Object.values(map.events)).toHaveLength(1);

        expect(currentPlayer.inventory.getBackpackItem('main', 0)?.nb).toBe(155);
    })

    it('is possible to pick up the item', () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: (3 * 200) + 30
        });

        DropItem.fromInventory({
            player: currentPlayer,
            amountToDrop: 45,
            slot: {
                backpack: 'main',
                slot: 0,
            }
        });

        const droppedItem = Object.values(map.events)[0];
        droppedItem?.execMethod('onPickUp', [currentPlayer as never]);

        expect(currentPlayer.inventory.getBackpackItem('main', 0)?.nb).toBe(200);
    });

    it('is not possible to pick up the item if the inventory is full', () => {
        SpawnItem.onGround({
            map,
            position: currentPlayer.position,
            item: {
                item: Potion,
                nb: 1,
            },
        });

        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 32 * 200
        });

        const droppedItem = Object.values(map.events)[0];

        droppedItem?.execMethod('onPickUp', [currentPlayer as never]);

        const nativeItem = currentPlayer.items.find(item => item.item.id === 'potion');
        expect(nativeItem?.nb).toBe(32 * 200);
    });

    it('does not change item quantity dropping to the ground and picking up', () => {
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 150,
        });
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 100,
        });
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 50,
        });
        TakeItem.toInventory(currentPlayer, {
            item: Sword,
            nb: 1,
        });

        DropItem.fromInventory({
            player: currentPlayer,
            amountToDrop: 1,
            slot: { backpack: 'main', slot: 2 }
        });

        let droppedItem = Object.values(map.events)[0];
        droppedItem?.execMethod('onPickUp', [currentPlayer as never]);

        expect(currentPlayer.inventory.getBackpackItem('main', 2)?.nb).toBe(1);

        DropItem.fromInventory({
            player: currentPlayer,
            amountToDrop: 200,
            slot: { backpack: 'main', slot: 0 }
        });

        droppedItem = Object.values(map.events)[0];
        droppedItem?.execMethod('onPickUp', [currentPlayer as never]);

        expect(currentPlayer.inventory.getBackpackItem('main', 0)?.nb).toBe(100);
        expect(currentPlayer.inventory.getBackpackItem('main', 2)?.nb).toBe(1);
    });
});

afterEach(() => {
    clear()
})
