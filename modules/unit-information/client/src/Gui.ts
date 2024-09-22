import { useCurrentPlayer } from "@rpgjs/client/react";
import { useObjects } from "@rpgjs/client/react"

export const useUnitInformation = () => {
    const currentPlayer: any = useCurrentPlayer();
    const objects: any[] = useObjects();

    const res = objects.filter(obj => {
        return obj.playerId === currentPlayer.unitPreviewId
    });

    return res.length > 0 ? res[0] : undefined;
}
