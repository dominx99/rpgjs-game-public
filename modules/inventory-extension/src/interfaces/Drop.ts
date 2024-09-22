import { ItemClass } from "./ItemClass";

export default interface Drop {
    probability: number;
    item: () => ItemClass;
}
