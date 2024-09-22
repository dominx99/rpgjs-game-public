import { RpgMap } from "@rpgjs/server";
import { Spawner } from "./Spawner";
import { takeWhile, timer } from "rxjs";
import { RpgCommonMap } from '@rpgjs/common'
import MobSpawnList from "../../modules/enemies/src/spawn/MobSpawnList";
import { getMobsOnMapCount } from "../shared/utils/maps/MapUtils";
import { NPCSpawner } from "./NPCSpawner";

export function spawnMobsOnMapInterval(map: RpgMap, interval: number = 60 * 1000) {
    const spawner = new Spawner(map, MobSpawnList);

    timer(0, interval)
        .pipe(takeWhile(() => RpgCommonMap.buffer.has(map.id)))
        .subscribe({
            next: () => {
                spawner.populate(getMobsOnMapCount(map));
            },
        })
}

export const spawnNPCs = (map: RpgMap) => {
    const spawner = new NPCSpawner(map);

    spawner.populate();
}
