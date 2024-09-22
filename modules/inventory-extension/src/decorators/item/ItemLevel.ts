import { isNil } from "../../../../../src/shared/utils/Utils";

export interface ItemLevelOptions {
    level: number;
    requiredLevelToEquip: number;
}

export function ItemLevel(options: ItemLevelOptions): (target: any) => void {
    return function (target: any) {
        target.prototype.level = options.level;
        target.prototype.requiredLevelToEquip = options.requiredLevelToEquip;
        if (isNil(options.level)) {
            target.prototype.level = 0;
        }
        if (isNil(options.requiredLevelToEquip)) {
            target.prototype.requiredLevelToEquip = 0;
        }
    };
}
