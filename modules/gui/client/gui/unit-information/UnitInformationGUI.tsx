import { useUnitInformation } from "../../../../unit-information/client/src/Gui";
import * as Styled from "./UnitInformationGUI.styles";
import { GUIWrapper } from "../../components/shared/GUIWrapper.tsx";
import { ProfilePreview } from "../../components/profile/ProfilePreview.tsx";
import { StatesAndEffects } from "../../components/profile/states/StateAndEffects.tsx";
import { StateContract } from "../../../../effects/client/src/contracts/StateContract.ts";

export default function UnitInformationGUI() {
    const unit = useUnitInformation();

    if (!unit) {
        return null;
    }

    const states = (unit.states ? Object.values(unit.states) : [])
        .filter(state => !!state) as StateContract[];

    const stateTimers = unit.stateTimers || {};

    return (
        <GUIWrapper>
            <Styled.UnitInformationWrapper>
                <Styled.Name>{unit.name}</Styled.Name>
                <ProfilePreview unit={unit} />
                <StatesAndEffects states={states} stateTimers={stateTimers} />
            </Styled.UnitInformationWrapper>
        </GUIWrapper>
    );
}
