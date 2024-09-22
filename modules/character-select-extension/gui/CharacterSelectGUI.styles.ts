import { styled } from "styled-components";
import characterSelectImg from '@/modules/config/assets/backgrounds/character-select.png';
import archerClassIconImg from '@/modules/config/assets/gui/shared/class-types/bow_n.png';
import warriorClassIconImg from '@/modules/config/assets/gui/shared/class-types/axes_n.png';
import mageClassIconImg from '@/modules/config/assets/gui/shared/class-types/abilities_n.png';
import rogueClsasIconImg from '@/modules/config/assets/gui/shared/class-types/2hswords_n.png';
import arrowLeftImg from '@/modules/config/assets/gui/shared/left_arrow_n.png';
import arrowRightImg from '@/modules/config/assets/gui/shared/right_arrow_n.png';
import arrowLeftHoveredImg from '@/modules/config/assets/gui/shared/left_arrow_h.png';
import arrowRightHoveredImg from '@/modules/config/assets/gui/shared/right_arrow_h.png';
import newsTopOrnamentImg from '@/modules/config/assets/gui/boxes/news_top_ornament.png';
import newsBottomOrnamentImg from '@/modules/config/assets/gui/boxes/news_bottom.png';
import scrollbackTrackImg from '@/modules/config/assets/gui/boxes/news_content_slider_rail.png';
import scrollbarImg from '@/modules/config/assets/gui/boxes/news_content_slider_rail.png';
import scrollbarThumbImg from '@/modules/config/assets/gui/boxes/news_slide_n.png';
import scrollbarThumbHoveredImg from '@/modules/config/assets/gui/boxes/news_slide_h.png';
import { ClassTypes } from "../../../src/heroes/utils/ClassTypes";
import { PrimaryButton, ButtonHoverStyles } from "../../gui/client/components/shared/Button.styled";

import buttonHoveredImg from '@/modules/config/assets/gui/buttons/mediumblue_h.png';

const iconMap = {
    [ClassTypes.WARRIOR]: warriorClassIconImg,
    [ClassTypes.MAGE]: mageClassIconImg,
    [ClassTypes.ROGUE]: rogueClsasIconImg,
    [ClassTypes.ARCHER]: archerClassIconImg,
}

export const CharacterSelectGUI = styled.div`
    background: url(${characterSelectImg});
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`

export const CharacterSelectPreviewWrapper = styled.div`
    position: absolute;
    top: 58%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export const DescriptionWrapper = styled.div`
    position: absolute;
    top: 20%;
    right: 15%;
`

export const DescriptionContent = styled.div`
    width: 300px;
    height: 300px;
    color: #fefefe;
    padding: 1rem;
    background: linear-gradient(180deg, rgba(179, 117, 73, .75) 0%, rgba(88, 51, 38, .75) 100%);
    background-size: 100% 100%;
    /* color: $text-color-light; */
    border-radius: 3px;
    overflow: auto;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        background: url(${newsTopOrnamentImg});
        background-size: 100% 100%;
        width: 100%;
        height: 35px;
        margin-top: -32px;
        filter: brightness(1.5);
    }

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background: url(${newsBottomOrnamentImg});
        background-size: 100% 100%;
        width: 50%;
        height: 35px;
        margin-bottom: -32px;
        filter: brightness(1.5);
    }

    &::-webkit-scrollbar-track {
        background: url(${scrollbackTrackImg});
        background-size: 100% 100%;
        width: 7px;
    }

    &::-webkit-scrollbar {
        background: url(${scrollbarImg});
        background-size: 100% 100%;
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background: url(${scrollbarThumbImg});
        background-size: 100% 100%;

        &:hover {
            background: url(${scrollbarThumbHoveredImg});
            background-size: 100% 100%;
        }
    }
`

export const DescriptionTitle = styled.h2`
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
`

export const DescriptionTitleText = styled.span`
`

export const DescriptionText = styled.p`
`


export const ClassIcon = styled.div<{ $type: string }>`
    background: url(${({ $type }) => iconMap[$type]});
    width: 48px;
    height: 48px;
    background-size: 100% 100%;
    margin-right: .5rem;
`

export const ArrowLeft = styled.div`
    background-image: url(${arrowLeftImg});
    background-size: 100% 100%;
    width: 75px;
    height: 75px;
    background-color: transparent;
    border: none;
    outline: none;
    position: absolute;
    top: 62%;
    left: 25%;
    filter: brightness(1.5);
    filter: brightness(0.9);
    transition: all 0.15s ease-in-out;

    &:hover {
        background-image: url(${arrowLeftHoveredImg});
        cursor: pointer;
        filter: brightness(1);
    }
`

export const ArrowRight = styled(ArrowLeft)`
    background-image: url(${arrowRightImg});
    left: unset;
    right: 25%;

    &:hover {
        background-image: url(${arrowRightHoveredImg});
    }
`

export const SubmitButton = styled(PrimaryButton)`
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 75px;
    font-size: 1.5rem;
`
