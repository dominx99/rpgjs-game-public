import styled from "styled-components";

export const Item = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ItemQuantity = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    color: white;
`

export const ItemImage = styled.div<{ $src: string }>`
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% 100%;
    background-image: ${(p) => `url(${p.$src})`};
`
