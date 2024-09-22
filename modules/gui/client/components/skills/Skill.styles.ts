import styled from "styled-components";
import skillFrameImg from '@/modules/config/assets/gui/frames/ability_slot_frame.png';
import skillFrameActiveImg from '@/modules/config/assets/gui/frames/ability_slot_hover_light.png';

export const Skill = styled.div<{ $src: string }>`
    background-image: url('${props => props.$src}');
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100%;
    min-width: 50px;
    min-height: 50px;
`

export const SkillFrame = styled.div`
    background-image: url(${skillFrameImg});
    background-size: 100% 100%;
    width: 50px;
    height: 50px;
    padding: .5rem;
    margin: .5rem;

    &:active {
        background-image: url(${skillFrameActiveImg});
    }
`
