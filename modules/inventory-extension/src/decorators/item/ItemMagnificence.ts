import { isNil } from "../../../../../src/shared/utils/Utils";
import { Magnificence } from "../../enum/ItemMagnificience";

export interface ItemMagnificenceOptions {
    magnificence: Magnificence;
}

export function ItemMagnificence(options: ItemMagnificenceOptions): (target: any) => void {
    return function (target: any) {
        target.prototype.magnificence = options.magnificence;
        if (isNil(options.magnificence)) {
            target.prototype.magnificence = Magnificence.LOWEST;
        }
    };
}
