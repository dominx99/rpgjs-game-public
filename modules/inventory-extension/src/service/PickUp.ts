import { RpgEvent, RpgPlayer } from "@rpgjs/server";

export class PickUp {
    static fromGround(player: RpgPlayer) {
        player.getCurrentMap()?.createMovingHitbox([{
            width: 64,
            height: 64,
            x: player.position.x - 32 + (player.width / 2),
            y: player.position.y - 32 + (player.height / 2),
        }]).subscribe({
            next: hitbox => {
                const droppedItem = hitbox.otherPlayersCollision
                    .filter(event => event instanceof RpgEvent)
                    .filter((event: any) => event.name === 'dropped-item')
                    .shift()
                    ;

                droppedItem?.execMethod('onPickUp', [player]);
                player.syncChanges();
            }
        })
    }
}
