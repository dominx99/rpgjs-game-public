import styled from "styled-components";
import droppableItemSlotImg from '@/modules/config/assets/gui/frames/fq_normal.png';

export const DroppableItemSlot = styled.div<{ $isOver: boolean, $src: string }>`
    background-image: url(${droppableItemSlotImg});
    background-size: 100% 100%;
    width: 64px;
    height: 64px;
    background-color: ${props => props.$isOver ? 'rgba(0, 255, 255, 0.2)' : 'transparent'};
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
        position: absolute;
        content: '';
        background-image: url(${props => props.$src});
        background-size: 100% 100%;
        width: 50px;
        height: 50px;
    }
`
