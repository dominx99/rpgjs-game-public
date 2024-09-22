import { styled } from "styled-components";

export const Action = styled.div<{ $src: string, $timeLeft: number }>`
    position: relative;
    width: 41px;
    height: 37px;
    background-position: center;
    background-size: cover;
    background-image: url(${props => props.$src});

    &:before {
        content: "";
        background: conic-gradient(
            rgba(0, 0, 0, 0.7) var(--timeLeft),
            rgba(0, 0, 0, 0.1) var(--timeLeft)
        );
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

`

export const ActionQuantity = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.8rem;
    color: white;
`

export const ActionCooldown = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
    color: #bbb;
    text-shadow: 0 0 5px black;
`

export const ActionDroppable = styled.div`
position: relative;
`
