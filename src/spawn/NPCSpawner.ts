import { RpgMap } from "@rpgjs/server";
import { EventPosOption } from "@rpgjs/server/lib/Game/Map";
import { PositionXY } from "@rpgjs/types";
import { NPCIdToEventMap } from "./NPCSpawnList";

interface NPCDetails {
    id: string;
    position: PositionXY,
}

export class NPCSpawner {
    private map: RpgMap;

    constructor(map: RpgMap) {
        this.map = map;
    }

    populate() {
        const npcsToSpawn: NPCDetails[] = this.map.getShapes()
            .filter(shape => Boolean(shape.properties.npc))
            .map(shape => ({
                id: shape.properties.npc,
                position: shape.position
            }));

        const eventOptions = this.convertNPCsToEventOptions(npcsToSpawn);

        const events = this.map.createDynamicEvent(eventOptions);
    }

    private convertNPCsToEventOptions(npcsToSpawn: NPCDetails[]): EventPosOption[] {
        return npcsToSpawn.map(npc => ({
            event: NPCIdToEventMap[npc.id],
            x: npc.position.x,
            y: npc.position.y,
        }));
    }
}
