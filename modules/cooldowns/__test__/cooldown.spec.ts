import { clear } from "@rpgjs/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { _beforeEach } from "../../../tests/unit-tests/specs/beforeEach";
import { RpgPlayer, RpgModule, RpgServer } from "@rpgjs/server";
import { RpgClient } from "@rpgjs/client";
import player from "../player";
import { CooldownManager, CooldownType } from "../src/CooldownManager";
import { Utils } from "@rpgjs/common";

@RpgModule<RpgServer>({
    player,
})
class RpgServerModule { }

@RpgModule<RpgClient>({
})
class RpgClientModule { }

let currentPlayer: RpgPlayer;

Utils.applyMixins(RpgPlayer, [CooldownManager]);

beforeEach(async () => {
    const res = await _beforeEach([{
        server: RpgServerModule,
        client: RpgClientModule
    }]);
    currentPlayer = res.player;

    vi.useFakeTimers();
});

describe('cooldown manager', () => {
    it('should add a cooldown', () => {
        vi.setSystemTime(10000);

        currentPlayer.addCooldown('punch-skill', CooldownType.Skill, 1000);

        expect(currentPlayer.cooldowns.length).toBe(1);
        expect(currentPlayer.getCooldown('punch-skill', CooldownType.Skill)).toMatchObject({
            id: 'punch-skill',
            type: CooldownType.Skill,
            after: 11000,
        });
    });

    it('should return null if no cooldown', () => {
        expect(currentPlayer.getCooldown('punch-skill', CooldownType.Skill)).toBeNull();
    });

    it('should return true if delayed', () => {
        vi.setSystemTime(10000);

        currentPlayer.addCooldown('punch-skill', CooldownType.Skill, 1000);

        vi.setSystemTime(10999);

        expect(currentPlayer.hasCooldown('punch-skill', CooldownType.Skill)).toBe(true);
    });

    it('should return false if not delayed', () => {
        vi.setSystemTime(10000);

        currentPlayer.addCooldown('punch-skill', CooldownType.Skill, 1000);

        vi.setSystemTime(11000);

        expect(currentPlayer.hasCooldown('punch-skill', CooldownType.Skill)).toBe(false);
    });

    it('should return false if no cooldown', () => {
        expect(currentPlayer.hasCooldown('punch-skill', CooldownType.Skill)).toBe(false);
    });

    it('cooldown should be removed after cooldown', () => {
        vi.setSystemTime(10000);

        currentPlayer.addCooldown('punch-skill', CooldownType.Skill, 1000);

        vi.setSystemTime(11000);

        expect(currentPlayer.hasCooldown('punch-skill', CooldownType.Skill)).toBe(false);

        expect(currentPlayer.cooldowns.length).toBe(0);
    });

    it('one cooldown should replace another', () => {
        vi.setSystemTime(10000);

        currentPlayer.addCooldown('punch-skill', CooldownType.Skill, 1000);
        currentPlayer.addCooldown('punch-skill', CooldownType.Skill, 2000);

        expect(currentPlayer.cooldowns.length).toBe(1);
        expect(currentPlayer.getCooldown('punch-skill', CooldownType.Skill)).toMatchObject({
            id: 'punch-skill',
            type: CooldownType.Skill,
            after: 12000,
        });
    });

    it('hasCooldown does not clear other cooldowns', () => {
        vi.setSystemTime(10000);

        currentPlayer.addCooldown('aoe-skill', CooldownType.Skill, 5000);
        currentPlayer.addCooldown('punch-skill', CooldownType.Skill, 2000);

        vi.setSystemTime(13000);

        currentPlayer.hasCooldown('punch-skill', CooldownType.Skill);
        currentPlayer.hasCooldown('punch-skill', CooldownType.Skill);
        currentPlayer.hasCooldown('aoe-skill', CooldownType.Skill);
        currentPlayer.hasCooldown('aoe-skill', CooldownType.Skill);
        currentPlayer.hasCooldown('aoe-skill', CooldownType.Skill);
        currentPlayer.hasCooldown('aoe-skill', CooldownType.Skill);

        expect(currentPlayer.hasCooldown('punch-skill', CooldownType.Skill)).toBe(false);
        expect(currentPlayer.hasCooldown('aoe-skill', CooldownType.Skill)).toBe(true);
    });
});

afterEach(() => {
    clear();

    vi.useRealTimers();
});
