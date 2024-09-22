import styled from "styled-components";
import { ProfileGui } from "../profile/ProfileGUI.styles";

export const Name = styled.div`
    position: absolute;
    top: -0.5rem;
    color: #fefefe;
    left: 105px;
    font-weight: bold;
    font-size: 1.1em;
    text-shadow: 1px 1px black;
    color: ${props => props.theme.colors.text.light};
`

export const UnitInformationWrapper = styled(ProfileGui)`
    position: absolute;
    top: ${props => props.theme.spacing(8)};
    left: ${props => props.theme.spacing(30)};
    transform: translateX(100%);
`
