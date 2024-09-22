import { RpgPlayer } from "@rpgjs/server";
import { KillableMob } from "../../enemies/mobs/KillableMob";
import { Chat, ChatMessageType } from './../../../modules/chat/server/service/Chat';

export class GainGold {
    static gainForMob(player: RpgPlayer, victim: KillableMob, chanceToGetExtraLoot: boolean = true) {
        let looted = false;

        if (chanceToGetExtraLoot) {
            looted = this.tryToGetExtraLoot(player, victim);
        }

        if (looted) {
            return;
        }

        player.gold += this.getGoldFromVictim(victim);
    }

    private static tryToGetExtraLoot(player: RpgPlayer, victim: KillableMob) {
        const random = Math.random() * 10000;
        const extraLootChance = 1000;

        if (random > extraLootChance) {
            return false;
        }

        const loot = Math.round(this.getRawGoldFromVictim(victim) * 1000);

        player.gold += loot;

        Chat.sendToAll({
            message: `${player.name} gained ${loot} of gold!`,
            type: ChatMessageType.Info
        })

        return true;
    }

    private static getGoldFromVictim(victim: KillableMob) {
        return Math.round(this.getRawGoldFromVictim(victim));
    }

    private static getRawGoldFromVictim(victim: KillableMob) {
        return Math.random() * (victim.goldToGainRange[1] - victim.goldToGainRange[0]) + victim.goldToGainRange[0]
    }
}
