import styled from "styled-components";
import actionBarImg from '@/modules/config/assets/gui/action_bar/action_bar.png';
import expBarImg from '@/modules/config/assets/gui/action_bar/xp_fill.png';

export const ActionBar = styled.div`
    background-image: url(${actionBarImg});
    background-size: 100% 100%;
    width: 500px;
    height: 75px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
`

export const XPBar = styled.div<{ $width: number }>`
    background-image: url(${expBarImg});
    background-size: 100% 100%;
    max-width: 341px;
    height: 8px;
    position: absolute;
    bottom: 7px;
    left: 79.5px;
    width: ${props => props.$width}px;
`

export const XPBarText = styled.div`
    width: 341px;
    text-align: center;
    font-size: ${({theme}) => theme.typography.sizes.size1};
    color: ${({theme}) => theme.colors.text.gray};
`

export const ActionsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 41px);
    grid-template-rows: repeat(1, 37px);
    grid-column-gap: 10px;
    grid-row-gap: 0px;
    position: absolute;
    top: 15px;
    left: 76px;
`
