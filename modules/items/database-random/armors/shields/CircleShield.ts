import { v4 } from 'uuid';
import { ItemClass } from '../../../../inventory-extension/src/interfaces/ItemClass';
import { ItemType } from '../../../../inventory-extension/src/enum/ItemType';
import { Shield } from '../../../../inventory-extension/src/decorators/Shield';
import { MagnificenceRandomizer } from '../../../../inventory-extension/src/service/MagnificenceRandomizer';
import { inject } from '@rpgjs/server';
import { MagnificenceToValue } from '../../../../inventory-extension/src/service/MagnificenceToValue';

export default function CircleShield(): ItemClass {
    const magnificenceRandomizer = inject(MagnificenceRandomizer);
    const magnificence = magnificenceRandomizer.get()

    // @ts-ignore
    @Shield({
        id: v4(),
        name: 'Circle Shield',
        displayName: 'Circle Shield',
        type: ItemType.Shield,
        icon: 'shield',
        equippable: true,
        price: 100,
        pdef: MagnificenceToValue.get(magnificence, 50, .1),
        sdef: MagnificenceToValue.get(magnificence, 35, .1),
        requiredLevelToEquip: 15,
        magnificence: magnificence,
    })
    class CircleShield {
    }

    return CircleShield;
}
