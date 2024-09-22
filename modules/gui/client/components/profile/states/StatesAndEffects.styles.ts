import { styled } from "styled-components";
import frameImg from '@/modules/config/assets/gui/shared/frames/tbd_frame.png';

export const StatesWrapper = styled.div`
    margin-left: 113px;
`

export const State = styled.div`
    width: 32px;
    height: 32px;
    position: relative;
    background-color: rgba(0, 0, 0, .3);

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url(${frameImg});
        background-size: 100% 100%;
    }
`

export const StateIcon = styled.div<{ $icon: string }>`
    width: 100%;
    height: 100%;
    background-image: url(${({ $icon }) => $icon});
    background-size: 100% 100%;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: conic-gradient(
            rgba(0, 0, 0, 0.7) var(--timeLeft),
            rgba(0, 0, 0, 0.1) var(--timeLeft)
        );
    }
`
