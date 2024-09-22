import { useDrop } from "react-dnd";
import * as Styled from './ActionSpillArea.styles'

export const ActionSpillArea = () => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'action',
        drop: () => ({ spill: true }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }))

    return (
        <Styled.ActionSpillArea
            ref={drop}
            $isOver={isOver}
        ></Styled.ActionSpillArea>
    )
}
