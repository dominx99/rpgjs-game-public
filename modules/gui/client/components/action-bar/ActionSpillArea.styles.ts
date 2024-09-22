import styled from "styled-components";

export const ActionSpillArea = styled.div<{ $isOver: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${props => props.$isOver ? 'rgba(0, 255, 255, 0.2)' : 'transparent'};
`
