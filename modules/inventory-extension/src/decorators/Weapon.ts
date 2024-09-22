import { Weapon as RPGWeapon } from '@rpgjs/database';
import { WeaponOptions as RPGWeaponOptions } from "@rpgjs/database/src/weapon";
import { TypeOfItem } from '../enum/ItemType';
import { Equippable } from '../interfaces/Equippable';
import { ItemCommon, RPGItemCommon } from './ItemCommon';
import { ItemLevel, ItemLevelOptions } from './item/ItemLevel';
import { ItemMagnificence, ItemMagnificenceOptions } from './item/ItemMagnificence';

export interface WeaponOptions extends RPGWeaponOptions, ItemCommon, Equippable, TypeOfItem, ItemLevelOptions, ItemMagnificenceOptions {
    attackAnimation: string;
    attackGraphic: string;
    weaponType: string;
    physicalAttackSkill: any;
    slowdownOnHitPercentage?: number;
    bullet?: any;
    distance?: number;
}

export function Weapon(options: WeaponOptions): (target: any, propertyKey: any) => void {
    return function(target: any) {
        RPGWeapon(options)(target);
        RPGItemCommon(options)(target);
        ItemLevel(options)(target);
        ItemMagnificence(options)(target);
        target.type = options.type;
        target.equippable = options.equippable;
        target.attackAnimation = options.attackAnimation;
        target.attackGraphic = options.attackGraphic;
        target.weaponType = options.weaponType;
        target.physicalAttackSkill = options.physicalAttackSkill;
        target.slowdownOnHitPercentage = options.slowdownOnHitPercentage;
        target.bullet = options.bullet;
        target.distance = options.distance;
    };
}
