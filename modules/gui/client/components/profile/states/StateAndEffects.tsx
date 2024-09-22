import { StateContract, StateTimerContract } from "../../../../../effects/client/src/contracts/StateContract"
import * as Styled from "./StatesAndEffects.styles";
import { State } from "./State.tsx";
import { useContext, useEffect, useState } from "react";
import { RpgReactContext } from "@rpgjs/client/react";

interface Props {
    states: StateContract[];
    stateTimers: { [key: string]: StateTimerContract };
}

export const StatesAndEffects = ({ states, stateTimers }: Props) => {
    const { rpgScene } = useContext(RpgReactContext);

    const [currentTime, setCurrentTime] = useState<number>(Date.now());

    const refreshRate = 1000 / 60;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(currentTime + refreshRate);
        }, refreshRate);

        return () => {
            clearInterval(interval);
        }
    }, [currentTime])

    useEffect(() => {
        const scene = rpgScene();
        if (!scene) {
            return;
        }

        scene.valuesChange.subscribe((obj: any) => {
            if (!obj.time) {
                return;
            }

            setCurrentTime(obj.time);
        });
    }, [rpgScene]);

    const elapsedPercentage = (stateId: string) => {
        if (!stateTimers[stateId]) {
            return 0;
        }

        const duration = stateTimers[stateId].until - stateTimers[stateId].since;
        const elapesed = currentTime - stateTimers[stateId].since;

        return Math.round(elapesed / duration * 100);
    }

    return (
        <Styled.StatesWrapper>
            { states.map((state) => (
                <State key={state.id} state={state} elapsedPercentage={elapsedPercentage(state.id)} />
            ))}
        </Styled.StatesWrapper>
    )
}
