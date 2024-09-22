import { EventData, RpgEvent, RpgMap } from "@rpgjs/server";
import { PositionXY } from "@rpgjs/types";

interface DeathAnimationPlayer {
    map?: RpgMap | null;
    position: PositionXY;
    graphic: string;
}

export default class DeathAnimation {
    static async play({ map, position, graphic }: DeathAnimationPlayer) {
        try {
            if (!map) {
                return;
            }

            /** @ts-ignore */
            @EventData({
                name: 'death-animation',
                hitbox: {
                    width: 64,
                    height: 64,
                }
            })
            class DeathAnimationEvent extends RpgEvent {
                onInit() {
                    this.setGraphic(graphic);
                    this.through = true;
                    this.throughOtherPlayer = true;
                }
            }

            const events = Object.values(map.createDynamicEvent({
                x: position.x,
                y: position.y,
                event: DeathAnimationEvent,
            })) as RpgEvent[];

            const event = events[0];

            event.server.send();
            event.showAnimation(graphic, 'death');
            event.remove();
        } catch (e) {
            console.error('Failed to play death animation', e);

            return;
        }
    }
}
