import styled from "styled-components";
import chatImg from '@/modules/config/assets/gui/chat/chat_background.png';
import inputImg from '@/modules/config/assets/gui/chat/chat_type.png';
import { PrimaryInput } from "../../components/shared/Input.styled";

export const Chat = styled.div`
    background-image: url(${chatImg});
    background-size: 100% 100%;
    position: absolute;
    bottom: 3px;
    left: 3px;
    z-index: 70;
    width: 450px;
    word-break: break-all;
`

export const MessagesList = styled.ul`
    list-style: none;
    color: white;
    font-family: $window-font-family;
    padding: 0;
    margin-left: 10px;
    max-height: 200px;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
        background: darken(#A8A7A7, 10%);
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
        background: #554E4B;
        border: 1px solid #393533;
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: darken(#554E4B, 10%);
        border-color: darken(#393533, 10%);
    }
`

export const Message = styled.li`
    color: ${props => props.color};
`

export const Input = styled(PrimaryInput)`
    background-image: url(${inputImg});
    background-color: transparent;
    background-size: 100% 100%;
    padding: 10px;
    width: calc(100% - 20px);
    border: none;
    color: #fefefe;
    margin: 0;
    height: auto;

    &:focus {
        outline: none;
    }
`
