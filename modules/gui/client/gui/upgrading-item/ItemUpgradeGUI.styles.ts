import styled from "styled-components";
import { BottomLeftCorner1, BottomRightCorner1, TopLeftCorner1, TopRightCorner1 } from "../../components/shared/Corners.styled";
import { ArrowRightIconBase } from "../../components/shared/Arrows.styled";
import { PrimaryButton } from "../../components/shared/Button.styled";
import itemUpgradeBoxImg from '@/modules/config/assets/gui/boxes/delete_box.png';

export const ItemUpgradeBoxTopLeftCorner = styled(TopLeftCorner1)``
export const ItemUpgradeBoxTopRightCorner = styled(TopRightCorner1)``
export const ItemUpgradeBoxBottomLeftCorner = styled(BottomLeftCorner1)``
export const ItemUpgradeBoxBottomRightCorner = styled(BottomRightCorner1)``

export const Title = styled.div`
    font-size: 2rem;
    padding: 1rem 0 2rem 0;
    text-align: center;
`

export const ItemUpgradeBox = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-image: url(${itemUpgradeBoxImg});
    background-size: 100% 100%;
    width: 300px;
    height: auto;
    padding: 2rem;
    color: white;

    display: flex;
    flex-direction: column;
`

export const DescribeItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ItemName = styled.div`
    width: calc(100% - 50px);
    text-align: center;
`

export const CurrentItemDetails = styled.div`
    padding: 1rem 0;
    width: 50%;
`

export const ItemDetail = styled.div`
    margin-bottom: .5rem;
`

export const DetailsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 2rem;
`

export const ArrowRightIcon = styled(ArrowRightIconBase)`
    width: 32px;
    height: 32px;
`

export const Actions = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: auto;
    justify-content: space-between;
`

export const Button = styled(PrimaryButton)`
    width: auto;
    padding: 1rem 3rem;
    min-width: initial;
`
