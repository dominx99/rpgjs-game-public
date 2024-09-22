import { Gui, RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";
import { GraphicsOfPlayer } from "../../src/graphics/PlayerGraphics";
import { Utils } from "@rpgjs/common";
import { inventorySchemas } from 'rpgjs-inventory/server/src/schemas/InventorySchemas'
import { Inventory } from "rpgjs-inventory/server/src/domain/Inventory";
import Equipment from "rpgjs-inventory/server/src/domain/Equipment";
import { Backpack } from "rpgjs-inventory/server/src/domain/Backpack";
import { InventoryInteractionHooks } from "./src/hooks/InventoryInteractionHooks";
import { itemSchemas } from "./src/schemas/InventorySchemas";
import { NativeInventoryItem } from "./src/interfaces/ItemModel";
import { isNumber } from "../../src/shared/utils/Utils";
import { CannotEquipItemError } from "rpgjs-inventory/server/src/domain/errors/CannotEquipItemError";
import { Chat, ChatMessageType } from "../chat/server/service/Chat";

declare module '@rpgjs/server' {
    export interface RpgPlayer {
        inventoryGui?: Gui;
        isInventoryOpened: boolean;
    }
}

const player: RpgPlayerHooks = {
    props: {
        items: [{ nb: Number, item: itemSchemas }],
        equipments: [itemSchemas],
        inventory: inventorySchemas,
    },

    canEquip(player: RpgPlayer, item: NativeInventoryItem): boolean {
        if (!isNumber(item.item.requiredLevelToEquip)) {
            return true;
        }

        if (player.level >= item.item.requiredLevelToEquip) {
            return true;
        }

        throw new CannotEquipItemError('You cannot equip this item, your level is too low');
    },

    onEquipFailed(player: RpgPlayer, error: Error) {
        Chat.sendToPlayer(player, {
            message: error.message,
            type: ChatMessageType.Warning
        });
    },

    onEquip(player: RpgPlayer) {
        GraphicsOfPlayer.sync(player);
    },

    onUnequip(player: RpgPlayer) {
        GraphicsOfPlayer.sync(player);
    },

    onAuthSuccess(player: RpgPlayer) {
        if (Utils.isObject(player.inventory)) {
            player.inventory = Inventory.load(player.inventory as any);
        }

        player.inventoryGui = player.gui('inventory-gui');
        player.isInventoryOpened = false;
    },

    onJoinMap(player: RpgPlayer) {
        /*
            TODO: Check where it is possible to move, because it doesn't work in onConnected hook
            I suppose it does not work there because synchronization is made per map and not per player
        */
        InventoryInteractionHooks.init(player);
        // ENDTODO
    },

    onInput(player: RpgPlayer, { input }) {
        if (input == 'inventory') {
            if (player.isInventoryOpened) {
                player.inventoryGui?.close();
                player.isInventoryOpened = false;
            } else {
                player.inventoryGui?.open();
                player.isInventoryOpened = true;
            }
        }
    }
}

const originalInitializeMethod = RpgPlayer.prototype.initialize;
RpgPlayer.prototype.initialize = function() {
    originalInitializeMethod.apply(this);

    this.inventory = new Inventory([new Backpack('main', 32)], new Equipment());
}

export default player;
