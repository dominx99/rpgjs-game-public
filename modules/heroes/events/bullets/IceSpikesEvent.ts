import { EventData, RpgEvent } from '@rpgjs/server';

@EventData({
    name: 'ice-spikes-bullet',
    hitbox: {
        width: 96,
        height: 48
    },
})
export default class IceSpikesEvent extends RpgEvent {
    onInit() {
        this.speed = 3;
        this.setGraphic('ice-spikes');
        this.through = true;
        this.throughOtherPlayer = true;
    }
}
