import styled from "styled-components";
import { TextSpan } from "../shared/Typography.styled";

export const ItemPreview = styled.div`
`

export const ItemName = styled.div<{ $moreSpacing: boolean }>`
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: ${props => props.theme.colors.text.cyan};
    margin-bottom: ${props => props.theme.spacing(props.$moreSpacing ? 8 : 3)};
`

export const RequiredLevel = styled(TextSpan)`
    font-size: 1rem;
    text-align: center;
    margin-bottom: ${props => props.theme.spacing(8)};
`
