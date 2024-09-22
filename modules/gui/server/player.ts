import { Components, RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";

const player: RpgPlayerHooks = {
    onAuthSuccess(player: RpgPlayer) {
        player.gui('profile-gui').open();
        player.gui('unit-information-gui').open();

        player.setComponentsTop(Components.text('{name}'))
    }
}

export default player;
