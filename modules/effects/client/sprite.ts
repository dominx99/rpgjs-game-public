import { RpgSprite, RpgSpriteHooks, inject } from '@rpgjs/client'
import { SpriteColorFilterBasedOnStates } from './src/service/SpriteColorFilterBasedOnStates';
import { StateContract } from './src/contracts/StateContract';

const sprite: RpgSpriteHooks = {
    onChanges(sprite: RpgSprite, updated: any) {
        if (!updated.states) {
            return;
        }

        const states = Object.values(updated.states) as StateContract[];
        inject(SpriteColorFilterBasedOnStates).update(sprite, states);
    }
}

export default sprite;
