import { RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";
import { Utils } from "@rpgjs/common";
import { Cooldown, CooldownManager, CooldownType } from "./src/CooldownManager";
import { cooldownSchema } from "./src/schemas/CooldownSchemas";

declare module "@rpgjs/server" {
    export interface RpgPlayer {
        cooldowns: Cooldown[];
        addCooldown(id: string, type: CooldownType, cooldown: number): void;
        getCooldown(id: string, type: CooldownType): Cooldown | null;
        hasCooldown(id: string, type: CooldownType): boolean;
    }
}

const player: RpgPlayerHooks = {
    props: {
        cooldowns: [cooldownSchema],
    }
}

const originalInitializeMethod = RpgPlayer.prototype.initialize;
RpgPlayer.prototype.initialize = function () {
    originalInitializeMethod.apply(this);
    this.cooldowns = [];
}

Utils.applyMixins(RpgPlayer, [CooldownManager]);

export default player;
