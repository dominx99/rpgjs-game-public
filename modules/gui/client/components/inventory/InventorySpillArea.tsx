import { useDrop } from "react-dnd";
import * as Styled from './InventorySpillArea.styles'

export const InventorySpillArea = () => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: () => ({ spill: true, name: 'item-slot' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }))

    return (
        <Styled.InventorySpillArea
            ref={drop}
            $isOver={isOver}
        ></Styled.InventorySpillArea>
    )
}
