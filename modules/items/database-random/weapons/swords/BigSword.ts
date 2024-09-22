import { v4 } from 'uuid';
import { ItemClass } from '../../../../inventory-extension/src/interfaces/ItemClass';
import { ItemType } from '../../../../inventory-extension/src/enum/ItemType';
import { Weapon } from '../../../../inventory-extension/src/decorators/Weapon';
import { WeaponType } from '../../../../inventory-extension/src/enum/WeaponType';
import { MagnificenceRandomizer } from '../../../../inventory-extension/src/service/MagnificenceRandomizer';
import { inject } from '@rpgjs/server';
import { MagnificenceToValue } from '../../../../inventory-extension/src/service/MagnificenceToValue';

export default function BigSword(): ItemClass {
    const magnificenceRandomizer = inject(MagnificenceRandomizer);
    const magnificence = magnificenceRandomizer.get()

    // @ts-ignore
    @Weapon({
        id: v4(),
        name: 'Big Sword',
        displayName: 'Big Sword',
        type: ItemType.Weapon,
        weaponType: WeaponType.ONE_HANDED,
        icon: 'sword',
        price: 2000,
        atk: MagnificenceToValue.get(magnificence, 50, .05),
        equippable: true,
        requiredLevelToEquip: 1,
        attackAnimation: 'attack',
        attackGraphic: 'bigslash',
        slowdownOnHitPercentage: 50,
        magnificence: magnificence,
    })
    class BigSword {
    }

    return BigSword;
}

