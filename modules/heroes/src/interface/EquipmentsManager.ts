import { ItemType } from "rpgjs-inventory";
import { ItemEntity } from "../../../inventory-extension/src/interfaces/ItemModel";

export interface EquipmentsManager {
    equipments: ItemEntity[];
}

export class EquipmentsManager {
    getEquippedWeapon(): ItemEntity | null {
        const item = this.equipments.find(item => item.type === ItemType.Weapon);

        if (!item) {
            return null;
        }

        return item;
    }
}
