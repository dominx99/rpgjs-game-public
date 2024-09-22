import { CharacterPreview } from "./CharacterPreview.tsx"
import { PlayerGraphics } from "../../../../../../src/graphics/PlayerGraphics";

interface Props {
    graphics: PlayerGraphics | null;
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

export const EquippedCharacterPreview = ({ graphics, scale, top, left, position, width, height, marginTop }: Props) => {
    if (!graphics) {
        return null;
    }

    const mappedGraphics = [
        ...graphics.base,
        ...Object.values(graphics?.equipped || {})
    ]

    return (
        <CharacterPreview
            top={top}
            left={left}
            position={position}
            scale={scale}
            graphics={mappedGraphics}
            width={width}
            height={height}
            marginTop={marginTop}
        />
    )
}
