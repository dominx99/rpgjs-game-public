import { useCurrentPlayer, useObjects } from "@rpgjs/client/react";
import * as Styled from './ProfileGUI.styles';
import { ProfilePreview } from "../../components/profile/ProfilePreview.tsx";
import { GUIWrapper } from "../../components/shared/GUIWrapper.tsx";

export default function ProfileGUI() {
    const currentPlayer = useCurrentPlayer();
    const objects = useObjects();

    const res = objects.filter(obj => {
        return obj.playerId === currentPlayer.id
    });

    if (res.length <= 0) {
        return null;
    }

    const player = res[0];

    return (
        <GUIWrapper>
            <Styled.ProfileWrapper>
                <ProfilePreview unit={player} />
            </Styled.ProfileWrapper>
        </GUIWrapper>
    )
}
