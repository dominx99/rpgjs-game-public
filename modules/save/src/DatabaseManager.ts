import { Utils } from "@rpgjs/common";
import { DatabaseTypes } from '@rpgjs/database';
import { ItemType } from "../../inventory-extension/src/enum/ItemType";
import { Plate } from "../../inventory-extension/src/decorators/Plate";
import { Weapon } from "../../inventory-extension/src/decorators/Weapon";
import { Shield } from "../../inventory-extension/src/decorators/Shield";

export interface DatabaseManager {
    database: any;
    addInDatabase(id: string, dataClass: any, type?: DatabaseTypes): void;
}

export class DatabaseManager {
    addInDatabaseInternal(id: string, dataClass: any, type?: DatabaseTypes) {
        if (Utils.isClass(dataClass)) {
            this.database[id] = dataClass
            return
        }

        if (Utils.isString(type)) {
            this.addInDatabase(id, dataClass, type);

            return;
        }

        if (!Utils.isObject(dataClass) || !dataClass.type) {
            throw new Error(`You must specify a type for the database ${id}`)
        }

        const itemType: ItemType = dataClass.type || type;

        switch (itemType) {
            case 'plate':
                // @ts-ignore
                @Plate(dataClass) class PlateClass { }
                this.database[id] = PlateClass
                break;
            case 'weapon':
                // @ts-ignore
                @Weapon(dataClass) class WeaponClass { }
                this.database[id] = WeaponClass
                break;
            case 'shield':
                // @ts-ignore
                @Shield(dataClass) class ShieldClass { }
                this.database[id] = ShieldClass
                break;
        }
    }
}
