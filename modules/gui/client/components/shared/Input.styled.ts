import styled from "styled-components";
import inputImg from '@/modules/config/assets/input.png'

export const PrimaryInput = styled.input`
    background: url(${inputImg});
    background-size: 100% 100%;
    width: 100%;
    height: 40px;
    line-height: 30px;
    padding-left: ${props => props.theme.spacing(6)};
    color: white;
    border: none;
`
