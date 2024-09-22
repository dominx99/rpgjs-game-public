import styled from "styled-components";
import { PrimaryButton } from "./Button.styled";
import { PrimaryInput } from "./Input.styled";
import dialogImg from '@/modules/config/assets/gui/base/frame_box_1.png';

export const Dialog = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    background-image: url(${dialogImg});
    background-size: 100% 100%;
    padding: 2rem;
    color: white;
`

export const DialogTitle = styled.div`
    font-size: 1.5rem;
    text-align: center;
`

export const DialogActions = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
`

export const DialogContent = styled.div``

export const Button = styled(PrimaryButton)``

export const Input = styled(PrimaryInput)``
