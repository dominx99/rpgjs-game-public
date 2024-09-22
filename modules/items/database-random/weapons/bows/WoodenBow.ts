import { v4 } from 'uuid';
import { ItemClass } from '../../../../inventory-extension/src/interfaces/ItemClass';
import { ItemType } from '../../../../inventory-extension/src/enum/ItemType';
import { Weapon } from '../../../../inventory-extension/src/decorators/Weapon';
import { WeaponType } from '../../../../inventory-extension/src/enum/WeaponType';
import { BulletType } from '../../../../inventory-extension/src/enum/BulletType';
import { MagnificenceRandomizer } from '../../../../inventory-extension/src/service/MagnificenceRandomizer';
import { inject } from '@rpgjs/server';
import { MagnificenceToValue } from '../../../../inventory-extension/src/service/MagnificenceToValue';

export default function WoodenBow(): ItemClass {
    const magnificenceRandomizer = inject(MagnificenceRandomizer);
    const magnificence = magnificenceRandomizer.get()

    // @ts-expect-error incorrect decorator definition
    @Weapon({
        id: v4(),
        name: 'Wooden Bow',
        displayName: 'Wooden Bow',
        type: ItemType.Weapon,
        weaponType: WeaponType.BOW,
        icon: 'bow',
        price: 4000,
        atk: MagnificenceToValue.get(magnificence, 30, .05),
        equippable: true,
        requiredLevelToEquip: 1,
        attackAnimation: 'shoot',
        attackGraphic: 'bow-shoot',
        slowdownOnHitPercentage: 80,
        bullet: BulletType.WOODEN_ARROW,
        distance: 300,
        magnificence: magnificence,
    })
    class WoodenBow {
    }

    return WoodenBow;
}
