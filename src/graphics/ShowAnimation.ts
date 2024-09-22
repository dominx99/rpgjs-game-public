import { RpgPlayer } from "@rpgjs/server";

export class ShowAnimation {
    static withReplace(player: RpgPlayer, animationName: string, graphic?: string | string[]) {
        let graphics = [
            ...(player.graphics?.base || []),
            ...Object.values((player.graphics?.equipped || [])),
        ]

        if (graphic) {
            graphics = [
                ...graphics,
                ...(Array.isArray(graphic) ? graphic : [graphic]),
            ]
        }

        player.showAnimation(graphics, animationName, true);
    }
}
