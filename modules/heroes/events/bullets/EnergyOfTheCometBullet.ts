import { EventData, RpgEvent } from '@rpgjs/server';

// @ts-ignore
@EventData({
    name: 'energy-of-the-comet-bullet',
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class EnergyOfTheCometBullet extends RpgEvent {
    onInit() {
        this.speed = 15;
        this.setGraphic('energy-of-the-comet');
        this.through = true;
        this.throughOtherPlayer = true;
    }
}
