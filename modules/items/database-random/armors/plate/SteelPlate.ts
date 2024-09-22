import { v4 } from 'uuid';
import { ItemClass } from '../../../../inventory-extension/src/interfaces/ItemClass';
import { Plate } from '../../../../inventory-extension/src/decorators/Plate';
import { ItemType } from '../../../../inventory-extension/src/enum/ItemType';
import { MagnificenceRandomizer } from '../../../../inventory-extension/src/service/MagnificenceRandomizer';
import { inject } from '@rpgjs/server';
import { MagnificenceToValue } from '../../../../inventory-extension/src/service/MagnificenceToValue';

export default function SteelPlate(): ItemClass {
    const magnificenceRandomizer = inject(MagnificenceRandomizer);
    const magnificence = magnificenceRandomizer.get();

    // @ts-ignore
    @Plate({
        id: v4(),
        name: 'Steel Armor',
        displayName: 'Steel Armor',
        icon: 'steel-plate-icon',
        graphic: {
            torso: 'steel-plate',
            legs: 'steel-plate-legs-male',
        },
        type: ItemType.Plate,
        price: 100,
        pdef: MagnificenceToValue.get(magnificence, 100, .1),
        sdef: MagnificenceToValue.get(magnificence, 75, .1),
        equippable: true,
        magnificence: magnificence,
    })
    class SteelPlate {
    }

    return SteelPlate;
}
