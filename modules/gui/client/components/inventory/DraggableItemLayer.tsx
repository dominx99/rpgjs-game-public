import { CSSProperties, useContext } from 'react'
import type { XYCoord } from 'react-dnd'
import { useDragLayer } from 'react-dnd'
import * as Styled from './DraggableItemWithPreview.styles';
import { RpgReactContext } from '@rpgjs/client/react';

const layerStyles: CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    left: 0,
    top: 0,
    zIndex: 1000,
}

function getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        }
    }

    let { x, y } = currentOffset

    const transform = `translate(${x}px, ${y}px)`
    return {
        transform,
        WebkitTransform: transform,
    }
}

export const DraggableItemLayer = () => {
    const { isDragging, item, initialOffset, currentOffset } =
        useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }))


    const { rpgResource } = useContext(RpgReactContext);

    const sprite = rpgResource.spritesheets.get(item?.item?.icon);
    const icon = sprite ? sprite.image : '';

    if (!icon) {
        return null;
    }

    function renderItem() {
        return (
            <Styled.Item>
                <Styled.ItemImage $src={icon} />
            </Styled.Item>
        )
    }

    if (!isDragging) {
        return null
    }

    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(initialOffset, currentOffset)}
            >
                {renderItem()}
            </div>
        </div>
    )
}
