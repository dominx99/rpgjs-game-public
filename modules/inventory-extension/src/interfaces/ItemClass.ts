import { ItemType } from "../enum/ItemType";

export type ItemClass = {
    new(...args: any[]),
    name?: string,
    price?: number,
    type?: ItemType,
    _type?: string,
    id?: string,
    icon?: string,
    graphic?: string | null,
    atk?: number,
    pdef?: number,
    displayName?: string,
}
