import styled from "styled-components";
import neededItemIconImg from '@/modules/config/assets/gui/frames/fq_normal.png';

export const NeededItemsContainer = styled.div`
    margin-top: 1rem;
    margin-bottom: 1rem;
`

export const NeededItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
`

export const NeededItemName = styled.div`
`

export const NeededItemIcon = styled.div<{ $src: string, $hasItem: boolean }>`
    background-image: url(${neededItemIconImg}});
    background-size: 100% 100%;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    background-color: ${props => props.$hasItem ? '#1aa430' : '#b82525'};

    &:before {
        content: '';
        background-image: url('${props => props.$src}');
        background-size: 100% 100%;
        width: 48px;
        height: 48px;
    }
`

export const NeededItemAmount = styled.div`
`

export const Text = styled.div`
    margin-top: 1rem;
`
