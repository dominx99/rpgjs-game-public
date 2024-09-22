import { EventData, RpgEvent } from '@rpgjs/server';

@EventData({
    name: 'throw-freezing-static-animation',
    hitbox: {
        width: 80,
        height: 64
    }
})
export default class ThrowFreezingEvent extends RpgEvent {
    onInit() {
        this.speed = 1;
        this.setGraphic('throw-freezing');
        this.through = true;
        this.throughOtherPlayer = true;
    }
}
