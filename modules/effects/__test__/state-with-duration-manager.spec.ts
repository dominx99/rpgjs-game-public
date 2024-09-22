import { clear } from "@rpgjs/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { _beforeEach } from "../../../tests/unit-tests/specs/beforeEach";
import { RpgPlayer, RpgModule, RpgServer } from "@rpgjs/server";
import { RpgClient } from "@rpgjs/client";
import { Utils } from "@rpgjs/common";
import { SpeedManager } from "../server/src/managers/SpeedManager";
import player from "../server/player";
import { State } from '@rpgjs/database'

@RpgModule<RpgServer>({
    player: player
})
class RpgServerModule { }

@RpgModule<RpgClient>({
})
class RpgClientModule { }

let currentPlayer: RpgPlayer;

Utils.applyMixins(RpgPlayer, [SpeedManager]);

@State({
    name: 'Freezing',
})
class Freezing {}

beforeEach(async () => {
    const res = await _beforeEach([{
        server: RpgServerModule,
        client: RpgClientModule
    }]);
    currentPlayer = res.player;

    vi.useFakeTimers();
});

describe('state with duration manager', () => {
    it('should have state in duration time', () => {
        vi.setSystemTime(100);
        currentPlayer.addStateWithDuration(Freezing, 1, 1000);

        vi.advanceTimersByTime(500);

        expect(currentPlayer.getState(Freezing).name).toBe('Freezing');

        vi.advanceTimersByTime(500);

        expect(currentPlayer.getState(Freezing)).toBe(undefined);
    });

    it('should overwrite current state with longer time', () => {
        vi.setSystemTime(100);
        currentPlayer.addStateWithDuration(Freezing, 1, 1000);
        currentPlayer.addStateWithDuration(Freezing, 1, 2000);

        vi.advanceTimersByTime(500);

        expect(currentPlayer.getState(Freezing)?.name).toBe('Freezing');

        vi.advanceTimersByTime(500);

        expect(currentPlayer.getState(Freezing)?.name).toBe('Freezing');

        vi.advanceTimersByTime(1000);

        expect(currentPlayer.getState(Freezing)).toBe(undefined);
    });

    it('should not overwrite current state with shorter time', () => {
        vi.setSystemTime(100);
        currentPlayer.addStateWithDuration(Freezing, 1, 2000);
        currentPlayer.addStateWithDuration(Freezing, 1, 1000);

        vi.advanceTimersByTime(500);

        expect(currentPlayer.getState(Freezing)?.name).toBe('Freezing');

        vi.advanceTimersByTime(500);

        expect(currentPlayer.getState(Freezing)?.name).toBe('Freezing');

        vi.advanceTimersByTime(1000);

        expect(currentPlayer.getState(Freezing)).toBe(undefined);
    });

    it('should release state when time is over', () => {
        vi.setSystemTime(100);
        currentPlayer.addStateWithDuration(Freezing, 1, 10000);

        vi.advanceTimersByTime(10000);

        expect(currentPlayer.getState(Freezing)).toBe(undefined);
    });

    it('should not overwrite current state when remaining time is more than new one', () => {
        vi.setSystemTime(100);

        currentPlayer.addStateWithDuration(Freezing, 1, 10000);

        vi.advanceTimersByTime(5000);

        currentPlayer.addStateWithDuration(Freezing, 1, 4000);

        vi.advanceTimersByTime(4000);

        expect(currentPlayer.getState(Freezing)?.name).toBe('Freezing');

        vi.advanceTimersByTime(1000);

        expect(currentPlayer.getState(Freezing)).toBe(undefined);
    });

});

afterEach(() => {
    clear();

    vi.useRealTimers();
});
