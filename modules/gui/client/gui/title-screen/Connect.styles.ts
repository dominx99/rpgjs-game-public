import styled from "styled-components";
import { PrimaryInput } from "../../components/shared/Input.styled";
import { PrimaryButton } from "../../components/shared/Button.styled";
import connectScreenBackgroundImg from '@/modules/config/assets/login-bg.png';

export const ConnectScreenWrapper = styled.div`
    position: absolute;
    background: url(${connectScreenBackgroundImg});
    width: 100%;
    height: 100%;
    display: flex;
    background-size: cover;
    background-position: center;
    z-index: 100;
`

export const LoginWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LoginContainer = styled.div`
    margin-bottom: 100px;;
    background-color: rgba(0, 0, 0, .5);
    width: 400px;
    padding: 2rem 1rem;
    border-radius: 3px;
`

export const LoginTitle = styled.div`
    color: white;
    text-align: center;
    font-size: 30px;
    margin-bottom: 20px;
`

export const LoginForm = styled.form`
    text-align: center;
`

export const LoginInput = styled(PrimaryInput)`
    width: 85%;
    margin-bottom: ${props => props.theme.spacing(8)};
`

export const LoginButton = styled(PrimaryButton)`
    display: inline-block;
`
