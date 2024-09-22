import styled from "styled-components";
import { ChannelButton } from "../shared/Button.styled";

export const ChannelsContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: ${props => props.theme.spacing(3)};
    padding-left: ${props => props.theme.spacing(3)};
    padding-top: ${props => props.theme.spacing(3)};
    padding-bottom: ${props => props.theme.spacing(2)};
`

export const Channel = styled(ChannelButton)`
    color: ${props => props.theme.colors.text.light};
`
