import styled from "styled-components";
import fillRedImg from '@/modules/config/assets/gui/profile/fill_red.png';
import fillBlueImg from '@/modules/config/assets/gui/profile/fill_blue.png';
import profileImg from '@/modules/config/assets/gui/profile/profile_merged.png';

export const ProfileWrapper = styled.div`
    position: absolute;
    top: ${props => props.theme.spacing(8)};
    left: ${props => props.theme.spacing(8)};
`

export const ProfileGui = styled.div`
    width: 350px;
    height: 103px;

    background: url(${profileImg});
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 20;
`

export const ProfilePreview = styled.div`
    position: absolute;
    top: 17px;
    left: 26px;
    width: 75px;
    height: 75px;
    overflow: hidden;
    border-radius: 100%;
`

export const Text = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #eceff1;
    font-size: 16px;
    line-height: 15px;
    height: 15px;
    font-weight: bold;
    z-index: 200;
    margin: 0;
    padding: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Bar = styled.div`
    position: absolute;
    width: 168px;
    z-index: 30;
    font-family: 'Nunito', sans-serif;
`

export const HpBar = styled(Bar)`
    top: 31px;
    left: 124px;
`

export const ManaBar = styled(Bar)`
    top: 61px;
    left: 123px;
`

export const Fill = styled.div`
    height: 19px;
    position: relative;
    transition: width .5s linear;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 300px;
`

export const FillRed = styled(Fill)`
    background-image: url(${fillRedImg});
`

export const FillBlue = styled(Fill)`
    background-image: url(${fillBlueImg});
`
