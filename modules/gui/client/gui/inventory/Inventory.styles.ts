import styled from "styled-components";
import inventoryImg from '@/modules/config/assets/gui/inventory/inventory.png';
import goldImg from '@/modules/config/assets/gui/inventory/gold.png';

export const Inventory = styled.div`
    position: absolute;
    right: 30px;
    bottom: 30px;
    width: 400px;
    height: 780px;
    z-index: 2;
    background-image: url(${inventoryImg});
    background-size: 100% 100%;
`

export const ItemsContainer = styled.div`
    position: absolute;
    top: 392px;
    left: 20px;
    width: 368px;
    height: 184px;
    display: grid;
    grid-template-columns: repeat(8, 46px);
    grid-template-rows: repeat(4, 46px);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`

export const EquipmentContainer = styled.div`
    position: absolute;
    top: 25px;
    left: 24px;
    width: 360px;
    height: 317px;
`

export const EquipmentSlot = styled.div<{ $x: number, $y: number, $src: string }>`
    position: absolute;
    width: 45px;
    height: 45px;
    margin: 5px;
    top: ${props => props.$y}px;
    left: ${props => props.$x}px;
    background-image: url(${props => props.$src});
    background-size: 100% 100%;
`

export const CharacterPreviewContainer = styled.div`
    position: absolute;
    right: 196px;
    top: 160px;
`

export const GoldContainer = styled.div`
    position: absolute;
    width: calc(100% - 4rem);
    left: 0;
    bottom: 0;
    padding: 1rem;
    margin: 1rem;
    background-color: rgba(25, 25, 25, 0.7);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: white;
`

export const GoldIcon = styled.div`
    width: 30px;
    height: 30px;
    background-image: url(${goldImg});
    background-size: 100% 100%;
    margin-right: 1rem;
`

export const GoldAmount = styled.div`
`
