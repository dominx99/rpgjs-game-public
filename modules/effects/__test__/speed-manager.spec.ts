import { clear } from "@rpgjs/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { _beforeEach } from "../../../tests/unit-tests/specs/beforeEach";
import { RpgPlayer, RpgModule, RpgServer, Speed } from "@rpgjs/server";
import { RpgClient } from "@rpgjs/client";
import { Utils } from "@rpgjs/common";
import { SpeedManager } from "../server/src/managers/SpeedManager";
import player from "../server/player";
import { SpeedEffectIdentifier } from "../server/src/enums/SpeedEffectIdentifier";

@RpgModule<RpgServer>({
    player: player
})
class RpgServerModule { }

@RpgModule<RpgClient>({
})
class RpgClientModule { }

let currentPlayer: RpgPlayer;

Utils.applyMixins(RpgPlayer, [SpeedManager]);

beforeEach(async () => {
    const res = await _beforeEach([{
        server: RpgServerModule,
        client: RpgClientModule
    }]);
    currentPlayer = res.player;

    vi.useFakeTimers();
});

describe('speed manager', () => {
    it('should slowdown player', () => {
        vi.setSystemTime(100);
        currentPlayer.speed = 3;
        currentPlayer.speedBase = Speed.Faster;

        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, .2, 100);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(1.4);
        expect(currentPlayer.speedEffects.length).toBe(1);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(7);
        expect(currentPlayer.speedEffects.length).toBe(0);
    });

    it('should speedup player', () => {
        vi.setSystemTime(100);
        currentPlayer.speed = 3;

        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, 2, 100);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(6);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(3);
    });

    it('multiple same effects should not stack', () => {
        vi.setSystemTime(100);
        currentPlayer.speed = 3;

        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, .2, 100);
        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, .2, 100);
        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, .2, 100);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(.6);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(3);
    });

    it('should take last effect', () => {
        vi.setSystemTime(100);
        currentPlayer.speed = 3;

        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, .2, 100);
        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, .4, 100);
        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, .6, 100);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(1.8);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(3);
    });

    it('should slowdown player and speedup player', () => {
        vi.setSystemTime(100);
        currentPlayer.speed = 3;

        currentPlayer.addSpeedEffect(SpeedEffectIdentifier.PHYSICAL_ATTACK_SLOWDOWN, .2, 100);
        currentPlayer.addSpeedEffect('super-speed-up-skill', 2, 100);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(1.2);

        vi.advanceTimersByTime(50);

        expect(currentPlayer.speed).toBe(3);
    });
});

afterEach(() => {
    clear();

    vi.useRealTimers();
});
