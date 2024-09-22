import { ItemEntity as RPGItemEntity } from 'rpgjs-inventory';
import { WeaponType } from "../enum/WeaponType";
import { BulletType } from '../enum/BulletType';
import { Magnificence } from '../enum/ItemMagnificience';

export type ItemEntity = RPGItemEntity & {
    pdef?: number;
    sdef?: number;
    level?: number;
    requiredLevelToEquip?: number;
    attackAnimation?: string;
    attackGraphic?: string;
    weaponType?: WeaponType;
    physicalAttackSkill?: any;
    slowdownOnHitPercentage?: number;
    bullet?: BulletType;
    distance?: number;
    magnificence?: Magnificence;
};

export type NativeInventoryItem = {
    item: ItemEntity;
    nb: number;
}
