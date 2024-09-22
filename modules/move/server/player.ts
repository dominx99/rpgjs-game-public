import { RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";
import { applyMixins } from '@rpgjs/common/lib/Utils';
import { MoveManager } from './src/MoveManager';

declare module "@rpgjs/server" {
    export interface RpgPlayer extends MoveManager {}
}

const player: RpgPlayerHooks = {
}

applyMixins(RpgPlayer, [
    MoveManager
])

export default player;
