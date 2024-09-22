import styled from "styled-components";
import topLeftCornerImg from '@/modules/config/assets/gui/corners/top_left_corner.png';
import topRightCornerImg from '@/modules/config/assets/gui/corners/top_right_corner.png';
import bottomLeftCornerImg from '@/modules/config/assets/gui/corners/bottom_left_corner.png';
import bottomRightCornerImg from '@/modules/config/assets/gui/corners/bottom_right_corner.png';

export const TopLeftCorner1 = styled.div`
    background-image: url(${topLeftCornerImg});
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
`

export const TopRightCorner1 = styled.div`
    background-image: url(${topRightCornerImg});
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
`

export const BottomLeftCorner1 = styled.div`
    background-image: url(${bottomLeftCornerImg});
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
`

export const BottomRightCorner1 = styled.div`
    background-image: url(${bottomRightCornerImg});
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 50px;
`
