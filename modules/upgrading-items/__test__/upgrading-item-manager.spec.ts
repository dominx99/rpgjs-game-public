import { RpgModule, RpgPlayer, RpgServer } from "@rpgjs/server";
import { beforeEach, describe, expect, it } from "vitest";
import player from "../server/player";
import { Potion, Sword } from "../../inventory-extension/__test__/fixtures/item";
import { _beforeEach } from "../../../tests/unit-tests/specs/beforeEach";
import { NativeInventoryItem } from "rpgjs-inventory";

let currentPlayer: RpgPlayer;

@RpgModule<RpgServer>({
    player,
    database: [
        Potion,
        Sword
    ],
})
class RpgServerModule { }

beforeEach(async () => {
    const res = await _beforeEach([{
        server: RpgServerModule,
    }]);

    currentPlayer = res.player;
});

describe('Upgrading item manager', () => {
    it('is possible to set upgrading item on player', () => {
        currentPlayer.addItem(Potion, 1);
        const potion = currentPlayer.getItem('potion') as NativeInventoryItem;

        currentPlayer.upgradingItem = potion.item

        expect(currentPlayer.upgradingItem).toBeDefined();
        expect(currentPlayer.upgradingItem.id).toBe(potion.item.id);
    });
});
