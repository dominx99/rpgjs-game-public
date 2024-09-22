import { RpgPlayer } from "@rpgjs/server";
import { NativeInventoryItem } from "../../../inventory/server/src/domain/Inventory";

export class NativeItems {
    static findItemById(player: RpgPlayer, itemId: string): NativeInventoryItem | undefined {
        return player.items.find(item => item.item.id === itemId) as NativeInventoryItem | undefined;
    }

    static hasItem(player: RpgPlayer, itemId: string): boolean {
        return Boolean(this.findItemById(player, itemId));
    }
}
