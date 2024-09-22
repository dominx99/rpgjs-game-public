import { RpgEvent, RpgPlayer, RpgServerEngine, inject } from "@rpgjs/server";
import { EventPosOption, RpgMap } from "@rpgjs/server/lib/Game/Map";
import { PositionXY } from "@rpgjs/types";

interface RandomAOESkillSpawnerOptions {
    event: typeof RpgEvent,
    radius: number,
}

export default class SquareAOESkillSpawner {
    static spawn(attacker: RpgPlayer, options: RandomAOESkillSpawnerOptions) {
        const map = attacker.getCurrentMap();

        if (!map) {
            return;
        }

        const positions = [
            ...this.getSquareCornerPositions(attacker.position.x, attacker.position.y, options.radius),
            ...this.getSquareEdgePositions(attacker.position.x, attacker.position.y, options.radius),
        ]
            .filter(position => this.filterBounds(position, map))
        ;

        const eventPositions = positions.map((position) => ({
            x: position.x,
            y: position.y,
            event: options.event,
        })) as EventPosOption[];

        const events = Object.values(map.createDynamicEvent(eventPositions)) as RpgEvent[];

        // TODO: Check if it started to work
        const server = inject(RpgServerEngine);
        server.send();

        events.forEach((event) => {
            event.showAnimation('aquamarine-green', 'stand');

            // TODO: Remove when it's fixed https://community.rpgjs.dev/d/250-rpgjs-v420
            setTimeout(() => {
                event.remove();
            }, 260);
        })
    }

    static getSquareCornerPositions(x: number, y: number, radius: number): PositionXY[] {
        const positions: PositionXY[] = []

        positions.push({
            x: x - radius,
            y: y - radius,
        });

        positions.push({
            x: x + radius,
            y: y - radius,
        });

        positions.push({
            x: x - radius,
            y: y + radius,
        });

        positions.push({
            x: x + radius,
            y: y + radius,
        });

        return positions;
    }

    static getSquareEdgePositions(x: number, y: number, radius: number): PositionXY[] {
        const positions: PositionXY[] = []

        positions.push({
            x: x,
            y: y - radius,
        });

        positions.push({
            x: x,
            y: y + radius,
        });

        positions.push({
            x: x - radius,
            y: y,
        });

        positions.push({
            x: x + radius,
            y: y,
        });

        return positions;
    }

    static filterBounds(position: PositionXY, map: RpgMap): boolean {
        if (position.x > map.widthPx || position.x < 0) {
            return false;
        }

        if (position.y > map.heightPx || position.y < 0) {
            return false;
        }

        return true;
    }
}
