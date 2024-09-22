import { Effect as RPGEffect } from '@rpgjs/database';

export enum ExtendedEffect {
    FREEZE = 'FREEZE',
}

export type EffectType = ExtendedEffect | RPGEffect;
