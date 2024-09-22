import { AbstractObject, RpgPlayer, inject } from "@rpgjs/server";
import { MovingHitboxFactory, MovingHitboxPositioning } from "./MovingHitboxFactory";
import { Observable } from "rxjs";

export default class SquareAOEHitbox {
    static ofPlayer(player: RpgPlayer, radius: number): Observable<AbstractObject> {
        const map = player.getCurrentMap();

        if (!map) {
            throw new Error('Player is not on a map');
        }

        // const id = 'square' + Math.round(Math.random() * 100).toString();
        // map.createShape({
        //     name: id,
        //     ...MovingHitboxFactory.ofPlayer({
        //         player: player,
        //         hitbox: {
        //             width: radius,
        //             height: radius,
        //         },
        //         positioning: MovingHitboxPositioning.Center
        //     }),
        //     properties: {
        //         color: '#00ff00',
        //         collision: false,
        //     }
        // });
        //
        // timer(3000).subscribe({
        //     next: () => {
        //         map.removeShape(id);
        //     }
        // });

        const hitboxFactory = inject(MovingHitboxFactory);

        /** @ts-ignore */
        return map.createMovingHitbox([
            hitboxFactory.ofPlayer({
                player: player,
                hitbox: {
                    width: radius,
                    height: radius,
                },
                positioning: MovingHitboxPositioning.Center
            })
        ]);
    }
}
