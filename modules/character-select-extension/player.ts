import { RpgPlayer, RpgPlayerHooks } from "@rpgjs/server";

const player: RpgPlayerHooks = {
    onCharacterSelected(player: RpgPlayer, actorId: string) {
        const name = player.name;
        player.setActor(actorId); // it overrides the player name
        player.name = name;
    },
}

export default player;
