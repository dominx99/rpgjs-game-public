import { EquippedGraphics } from "../../../../src/graphics/PlayerGraphics";

export interface ItemCommon {
    displayName?: string,
    graphic?: EquippedGraphics,
    icon: string,
    consumable?: boolean,
}

export function RPGItemCommon(options: ItemCommon) {
    return function (target: any) {
        target.displayName = options.displayName;
        target.graphic = options.graphic;
        target.icon = options.icon;
        target.consumable = options.consumable;
    };
}
