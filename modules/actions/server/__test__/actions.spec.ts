import { RpgPlayer, RpgModule, RpgServer } from '@rpgjs/server';
import { RpgClient } from '@rpgjs/client';
import { afterEach, beforeEach, describe, expect, it, test, vitest } from 'vitest';
import { clear } from '@rpgjs/testing';
import { player } from '../player';
import { _beforeEach } from '../../../../tests/unit-tests/specs/beforeEach';
import { Utils } from '@rpgjs/common';
import { ActionKey, ActionManager, ActionType } from '../src/ActionManager';
import ShortcutManager from '../src/ShortcutManager';
import { HurricaneSkill, PunchSkill } from './../../../../tests/unit-tests/specs/fixtures/skills';
import InputHandler from '../src/InputHandler';
import { Potion, Sword } from '../../../inventory-extension/__test__/fixtures/item';
import { Backpack, BackpackItem, Equipment, Inventory } from 'rpgjs-inventory';
import { TakeItem } from '../../../inventory-extension/src/service/TakeItem';
import { CooldownManager } from '../../../cooldowns/src/CooldownManager';

/** @ts-ignore */
@RpgModule<RpgServer>({
    player,
    database: [
        PunchSkill,
        HurricaneSkill,
        Potion,
        Sword,
    ]
})
class RpgServerModule { }

/** @ts-ignore */
@RpgModule<RpgClient>({
})
class RpgClientModule { }

let currentPlayer: RpgPlayer;

declare module '@rpgjs/server' {
    interface RpgPlayer {
        inventory: Inventory
    }
}

beforeEach(async () => {
    Utils.applyMixins(RpgPlayer, [ActionManager, ShortcutManager, CooldownManager]);

    const res = await _beforeEach([{
        server: RpgServerModule,
        client: RpgClientModule
    }]);
    currentPlayer = res.player;

    currentPlayer.cooldowns = [];
});

describe('Action manager', () => {
    it('action is defined', () => {
        currentPlayer.setAction({
            id: 'punch-skill',
            type: ActionType.Skill,
            key: ActionKey.One,
        });

        const action = currentPlayer.getAction(ActionKey.One);

        expect(action?.instance).toBeDefined();
        expect(action?.instance.icon).toBe('punch-skill-icon');
        expect(action?.id).toBe('punch-skill');
    });

    it('action is not defined', () => {
        const action = currentPlayer.getAction(ActionKey.One);

        expect(action).toBeNull();
    });

    it('skill action is possible to handle', async () => {
        currentPlayer.learnSkill(PunchSkill);

        currentPlayer.setAction({
            id: 'punch-skill',
            type: ActionType.Skill,
            key: ActionKey.One,
        });

        const spy = vitest.spyOn(currentPlayer, 'useSkill');

        await InputHandler.handle(currentPlayer, {
            input: 'key1',
            mousePosition: { x: 0, y: 0 }
        });

        expect(spy).toHaveBeenCalledWith('punch-skill');
    });

    it('decrease item quantity when used', async () => {
        currentPlayer.inventory = new Inventory([new Backpack('main', 32)], new Equipment());
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 5
        })

        currentPlayer.setAction({
            id: 'potion',
            type: ActionType.Item,
            key: ActionKey.One,
            meta: {
                slot: {
                    backpack: 'main',
                    slot: 0,
                }
            }
        });

        const spy = vitest.spyOn(currentPlayer, 'useItem');

        await InputHandler.handle(currentPlayer, {
            input: 'key1',
            mousePosition: { x: 0, y: 0 }
        });

        expect(spy).toHaveBeenCalledWith('potion');

        const backpackItem = currentPlayer.inventory.getBackpackItemBySlot({ backpack: 'main', slot: 0 }) as BackpackItem;

        expect(backpackItem?.nb).toBe(4);
    });

    it('removes item from inventory and action bar if quantity is 0', async () => {
        currentPlayer.inventory = new Inventory([new Backpack('main', 32)], new Equipment());
        TakeItem.toInventory(currentPlayer, {
            item: Potion,
            nb: 1
        })

        currentPlayer.setAction({
            id: 'potion',
            type: ActionType.Item,
            key: ActionKey.One,
            meta: {
                slot: {
                    backpack: 'main',
                    slot: 0,
                }
            }
        });

        const spy = vitest.spyOn(currentPlayer, 'useItem');

        await InputHandler.handle(currentPlayer, {
            input: 'key1',
            mousePosition: { x: 0, y: 0 }
        });

        expect(spy).toHaveBeenCalledWith('potion');

        const backpackItem = currentPlayer.inventory.getBackpackItemBySlot({ backpack: 'main', slot: 0 });
        expect(backpackItem).toBeNull();

        const action = currentPlayer.getAction(ActionKey.One);
        expect(action).toBeNull();
    });

    it('actions should be empty when last action is removed', () => {
        currentPlayer.setAction({
            id: 'punch-skill',
            type: ActionType.Skill,
            key: ActionKey.One,
        });

        currentPlayer.removeActionByKey(ActionKey.One);

        expect(currentPlayer.actions.length).toBe(0);
    });

    it('is not allowed to add non consumable item to action bar', () => {
        TakeItem.toInventory(currentPlayer, {
            item: Sword,
            nb: 1
        });

        currentPlayer.setAction({
            id: 'sword',
            type: ActionType.Item,
            key: ActionKey.One,
            meta: {
                slot: {
                    backpack: 'main',
                    slot: 0,
                }
            }
        });

        expect(currentPlayer.getAction(ActionKey.One)).toBeNull();
    });

    it('should remove action', () => {
        currentPlayer.setAction({
            id: 'punch-skill',
            type: ActionType.Skill,
            key: ActionKey.Two,
        });

        currentPlayer.removeActionByKey(ActionKey.Two);

        currentPlayer.setAction({
            id: 'punch-skill',
            type: ActionType.Skill,
            key: ActionKey.Three,
        });

        currentPlayer.removeActionByKey(ActionKey.Three);

        currentPlayer.setAction({
            id: 'punch-skill',
            type: ActionType.Skill,
            key: ActionKey.Two,
        });

        const index = currentPlayer.actions.findIndex((action) => action.key === ActionKey.Three);

        expect(index).toBe(-1);
    });
});

afterEach(() => {
    clear()
})
