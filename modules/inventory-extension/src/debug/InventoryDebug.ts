import { RpgPlayer } from "@rpgjs/server";
import { TakeItem } from "../service/TakeItem";
import UpgradingScroll1 from "../../../items/database/scrolls/UpgradingScroll1";
import UpgradingScroll2 from "../../../items/database/scrolls/UpgradingScroll2";
import UpgradingScroll3 from "../../../items/database/scrolls/UpgradingScroll3";
import BigSword from "../../../items/database-random/weapons/swords/BigSword";
import SteelPlate from "../../../items/database-random/armors/plate/SteelPlate";
import CircleShield from "../../../items/database-random/armors/shields/CircleShield";
import Potion from "../../../items/database/consumables/Potion";
import WoodenBow from "../../../items/database-random/weapons/bows/WoodenBow";

export class InventoryDebug {
    static addRandomItems(player: RpgPlayer) {
        // TODO: Remove this
        TakeItem.toInventory(player, {
            item: Potion,
            nb: 150,
        });
        TakeItem.toInventory(player, {
            item: Potion,
            nb: 100,
        });
        TakeItem.toInventory(player, {
            item: Potion,
            nb: 50,
        });
        TakeItem.toInventory(player, {
            item: UpgradingScroll1,
            nb: 15,
        });
        TakeItem.toInventory(player, {
            item: UpgradingScroll2,
            nb: 10,
        });
        TakeItem.toInventory(player, {
            item: UpgradingScroll3,
            nb: 10,
        });
        setTimeout(() => {
            const item = BigSword();
            if (!item || !item.id) {
                return;
            }
            player.server.addInDatabase(item.id, item);
            item.prototype.level = 9;
            TakeItem.toInventory(player, {
                item: item,
                nb: 1,
            });

            const bow = WoodenBow();
            if (!bow || !bow.id) {
                return;
            }
            player.server.addInDatabase(bow.id, bow);
            TakeItem.toInventory(player, {
                item: bow,
                nb: 1,
            });

            let plate = SteelPlate();
            if (!plate || !plate.id) {
                return;
            }
            player.server.addInDatabase(plate.id, plate);
            plate.prototype.level = 4;
            TakeItem.toInventory(player, {
                item: plate,
                nb: 1,
            });

            plate = SteelPlate();
            if (!plate || !plate.id) {
                return;
            }
            player.server.addInDatabase(plate.id, plate);
            TakeItem.toInventory(player, {
                item: plate,
                nb: 1,
            });

            plate = SteelPlate();
            if (!plate || !plate.id) {
                return;
            }
            player.server.addInDatabase(plate.id, plate);
            TakeItem.toInventory(player, {
                item: plate,
                nb: 1,
            });

            const shield = CircleShield();
            if (!shield || !shield.id) {
                return;
            }
            player.server.addInDatabase(shield.id, shield);
            TakeItem.toInventory(player, {
                item: shield,
                nb: 1,
            });
        }, 2000);

        setTimeout(() => {
            const item = BigSword();
            if (!item || !item.id) {
                return;
            }
            player.server.addInDatabase(item.id, item);
            TakeItem.toInventory(player, {
                item: item,
                nb: 1,
            });

            let plate = SteelPlate();
            if (!plate || !plate.id) {
                return;
            }
            player.server.addInDatabase(plate.id, plate);
            TakeItem.toInventory(player, {
                item: plate,
                nb: 1,
            });

            plate = SteelPlate();
            if (!plate || !plate.id) {
                return;
            }
            player.server.addInDatabase(plate.id, plate);
            TakeItem.toInventory(player, {
                item: plate,
                nb: 1,
            });

            plate = SteelPlate();
            if (!plate || !plate.id) {
                return;
            }
            player.server.addInDatabase(plate.id, plate);
            TakeItem.toInventory(player, {
                item: plate,
                nb: 1,
            });

            const shield = CircleShield();
            if (!shield || !shield.id) {
                return;
            }
            player.server.addInDatabase(shield.id, shield);
            TakeItem.toInventory(player, {
                item: shield,
                nb: 1,
            });
        }, 5000);
    }
}
