import { EventData, RpgEvent, Speed } from '@rpgjs/server';

// @ts-ignore
@EventData({
    name: 'moving-green-fire-event',
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class MovingGreenFireBullet extends RpgEvent {
    onInit() {
        this.speed = Speed.Faster;
        this.setGraphic('moving-green-fire');
        this.through = true;
        this.throughOtherPlayer = true;
        this.checkCollision = false;
    }
}
