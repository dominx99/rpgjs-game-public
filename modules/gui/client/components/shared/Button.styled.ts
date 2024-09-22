import styled from "styled-components";
import buttonImg from '@/modules/config/assets/gui/buttons/mediumblue_p.png';
import buttonHoveredImg from '@/modules/config/assets/gui/buttons/mediumblue_h.png';
import channelButtonImg from '@/modules/config/assets/gui/shared/channel_n.png';
import channelHoveredImg from '@/modules/config/assets/gui/shared/channel_h.png';

export const BaseButton = styled.button`
    background-color: transparent;
    background-image: url(${buttonImg});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    min-width: 160px;
    height: 55px;
    display: block;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-image 0.15s ease-in-out;
`

export const PrimaryButton = styled(BaseButton)`
    &:hover {
        background-image: url(${buttonHoveredImg});
        background-size: 100% 100%;
    }
`

export const ChannelButton = styled.button`
    background-color: transparent;
    display: block;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-image 0.15s ease-in-out;
    padding: ${props => props.theme.spacing(2)};

    background-image: url(${channelButtonImg});
    background-color: transparent;
    background-size: 100% 100%;
    background-repeat: no-repeat;

    &:hover, &.active {
        background-image: url(${channelHoveredImg});
    }
`
