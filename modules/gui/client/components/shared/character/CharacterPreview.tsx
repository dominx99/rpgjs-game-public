import { RpgReactContext } from "@rpgjs/client/react"
import { useContext } from "react"
import * as Styled from "./CharacterPreview.styles"

interface Props {
    graphics: string[],
    scale: number,
    top?: number,
    left?: number,
    position?: {
        x: number,
        y: number,
    },
    width?: number,
    height?: number,
    marginTop?: number,
}

export const CharacterPreview = ({ graphics, scale, top, left, position, width, height, marginTop }: Props) => {
    const { rpgResource } = useContext(RpgReactContext);

    const mapSpritesheets = (graphics: string[]): string[] => {
        const spritesheets = graphics.map(
            graphic => rpgResource.spritesheets.get(graphic)?.image
        ).filter(sprite => Boolean(sprite));

        return spritesheets as string[];
    }

    const spritesheets: string[] = mapSpritesheets(graphics);

    return (
        <>
            {spritesheets.map((spritesheet, index) => (
                <Styled.CharacterElement
                    $position={position || { x: 0, y: 0 }}
                    $top={top || 50} $left={left || 50}
                    key={index}
                    $src={spritesheet}
                    $scale={scale}
                    $height={height || 64}
                    $width={width || 64}
                    $marginTop={marginTop || 0}
                />
            ))}
        </>
    )
}
