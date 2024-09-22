import styled from "styled-components";

export const TextSpan = styled.span<{ $color?: string }>`
    color: ${props => props.theme.colors.text[props.$color || 'light']};
`

