import { Magnificence } from "../enum/ItemMagnificience";

export const MagnificenceToValue = {
    get: (magnificence: Magnificence, value: number, rate: number): number => {
        return value + Math.round(value * (magnificence - 1) * rate);
    }
}
