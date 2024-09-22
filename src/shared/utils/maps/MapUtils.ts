import { RpgMap } from "@rpgjs/server";
import { KillableMob } from "../../../enemies/mobs/KillableMob";

export interface MobsOnMap {
    [name: string]: number;
}

export const getMobsOnMapCount = (map: RpgMap): MobsOnMap => {
    return getMobsOnMap(map)
        .map((event: KillableMob) => event.name)
        .reduce((acc, name) => {
            if (!acc[name]) {
                acc[name] = 0;
            }
            acc[name]++;
            return acc;
        }, {})
        ;
}

export const getMobsOnMap = (map: RpgMap): KillableMob[] => {
    return Object.values(map.events)
        .filter(event => event instanceof KillableMob) as KillableMob[];
}
