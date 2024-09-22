import styled from "styled-components";

export const CharacterElement = styled.div<{
    $src: string,
    $scale: number,
    $top: number,
    $left: number,
    $position: { x: number, y: number },
    $height: number,
    $width: number,
    $marginTop: number,
}>`
    position: absolute;
    top: ${({ $top }) => $top}%;
    left: ${({ $left }) => $left}%;
    width: ${({ $width }) => $width}px;
    height: ${({ $height }) => $height}px;
    margin-top: ${({ $marginTop }) => $marginTop}px;
    background-position: ${({ $position }) => `${$position.x}px ${$position.y}px`};
    background-image: url(${({ $src }) => $src});
    transform: translateX(-50%) translateY(-50%) scale(${({ $scale }) => $scale});
`
