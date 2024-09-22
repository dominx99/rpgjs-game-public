import { EventData, RpgEvent } from '@rpgjs/server';

// @ts-ignore
@EventData({
    name: 'aquamarine',
    hitbox: {
        width: 96,
        height: 144,
    }
})
export default class AquamarineGreen extends RpgEvent {
    onInit() {
        this.speed = 0;
        this.setGraphic('aquamarine-green');
        this.through = true;
        this.throughOtherPlayer = true;
    }
}
