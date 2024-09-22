import { EventData, RpgEvent } from "@rpgjs/server";

@EventData({
    name: 'SimpleBlacksmith',
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class SimpleBlacksmith extends RpgEvent {
    onInit() {
        this.setGraphic('blacksmith');
    }
}
