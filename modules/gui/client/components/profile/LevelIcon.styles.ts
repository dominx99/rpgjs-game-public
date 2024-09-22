import styled from "styled-components";
import levelIconImg from '@/modules/config/assets/gui/shared/frames/cb_icon_frame.png'
import levelMaskIconImg from '@/modules/config/assets/gui/shared/frames/frame_empty_and_mask.png'

export const LevelIconWrapper = styled.div`
    position: absolute;
    top: 100%;
    transform: translateY(-100%);
    left: 24%;
    width: 32px;
    height: 32px;
    background-size: 100% 100%;
    background-image: url(${levelMaskIconImg});
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    z-index: 10;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 32px;
        height: 32px;
        background-image: url(${levelIconImg});
        background-size: 100% 100%;
    }
`
