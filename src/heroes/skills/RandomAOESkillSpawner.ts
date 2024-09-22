import { RpgEvent, RpgPlayer } from "@rpgjs/server";
import { EventPosOption } from "@rpgjs/server/lib/Game/Map";
import { PositionXY } from "@rpgjs/types";

interface RandomAOESkillSpawnerOptions {
    event: typeof RpgEvent,
    radius: number,
    count: number,
}

export default class RandomAOESkillSpawner {
    static spawn(attacker: RpgPlayer, options: RandomAOESkillSpawnerOptions) {
        const map = attacker.getCurrentMap();

        if (!map) {
            return;
        }

        const positions = this.getRandomPositionsInRadius(attacker.position.x, attacker.position.y, options.radius, options.count);
        const eventPositions = positions.map((position) => ({
            x: position.x,
            y: position.y,
            event: options.event,
        })) as EventPosOption[];

        const events = Object.values(map.createDynamicEvent(eventPositions)) as RpgEvent[];

        events.forEach((event) => {
            event.server.send();
            event.showAnimation('aquamarine-green', 'stand');
            event.remove();
        })
    }

    static getRandomPositionsInRadius(x: number, y: number, radius: number, count: number) {
        const positions: PositionXY[] = [];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * radius;

            const px = x + r * Math.cos(angle);
            const py = y + r * Math.sin(angle);

            positions.push({ x: px, y: py });
        }

        return positions;
    }
}
