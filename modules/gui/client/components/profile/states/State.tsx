import { useCallback, useContext, useRef } from 'react';
import { StateContract } from '../../../../../effects/client/src/contracts/StateContract';
import * as Styled from './StatesAndEffects.styles';
import { RpgReactContext } from '@rpgjs/client/react';

interface Props {
    state: StateContract;
    elapsedPercentage: number;
}

export const State = ({ state, elapsedPercentage }: Props) => {
    const { rpgResource } = useContext(RpgReactContext);

    const icon = useCallback((stateId: string) => {
        const sprite = rpgResource.spritesheets.get(stateId)

        if (!sprite) {
            return '';
        }

        return sprite.image;
    }, []);


    const ref = useRef<HTMLDivElement>(null);

    ref.current?.style.setProperty('--timeLeft', `${elapsedPercentage}%`);

    return (
        <Styled.State key={state.id}>
            <Styled.StateIcon ref={ref} $icon={icon(state.id)} />
        </Styled.State>
    )
}
