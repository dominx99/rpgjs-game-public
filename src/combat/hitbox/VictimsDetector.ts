import { AbstractObject, RpgPlayer } from "@rpgjs/server";
import { KillableMob } from "../../enemies/mobs/KillableMob";

export class VictimsDetector {
    static detectMob(otherPlayersCollision: AbstractObject[], attackerId: string, attackerMapId?: string): KillableMob[] {
        if (!attackerMapId) throw new Error('attackerMapId is required');

        const result = otherPlayersCollision.filter((player: AbstractObject) => player instanceof KillableMob) as KillableMob[];

        return result
            .filter((victim: KillableMob) => victim.id != attackerId)
            .filter((victim: KillableMob) => victim.getCurrentMap()?.id == attackerMapId)
        ;
    }

    static detectPlayer(otherPlayersCollision: AbstractObject[], attackerId: string, attackerMapId?: string): RpgPlayer[] {
        if (!attackerMapId) throw new Error('attackerMapId is required');

        const result = otherPlayersCollision.filter((player: AbstractObject) => player.type === 'player') as RpgPlayer[];

        return result
            .filter((victim: RpgPlayer) => victim.id != attackerId)
            .filter((victim: RpgPlayer) => victim.getCurrentMap()?.id == attackerMapId)
        ;
    }
}
