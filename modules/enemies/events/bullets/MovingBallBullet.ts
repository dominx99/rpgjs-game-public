import { EventData, RpgEvent, Speed } from '@rpgjs/server';

// @ts-ignore
@EventData({
    name: 'moving-ball-event',
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class MovingBallEvent extends RpgEvent {
    onInit() {
        this.speed = Speed.Fastest;
        this.setGraphic('moving-ball');
        this.through = true;
        this.throughOtherPlayer = true;
    }
}
