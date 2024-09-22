import { useDrop } from "react-dnd";
import * as Styled from "./DroppableItemSlot.styles"
import { RpgReactContext } from "@rpgjs/client/react";
import { useContext } from "react";
import { CanUpgradeItem } from "../../../../upgrading-items/client/src/CanUpgradeItem";
import { InventoryItemContract } from "../../../../inventory-extension/src/contracts/ItemContract";

interface Props {
    iconName?: string;
}

export const DroppableItemSlot = ({ iconName }: Props) => {
    const { rpgResource } = useContext(RpgReactContext);
    const sprite = rpgResource.spritesheets.get(iconName);
    const icon = sprite ? sprite.image : '';

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'item',
        drop: () => ({ name: 'upgrade-item' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        canDrop: (item: InventoryItemContract) => {
            return CanUpgradeItem.check(item.item);
        }
    }));

    return (
        <Styled.DroppableItemSlot ref={drop} $isOver={isOver && canDrop} $src={icon}>
        </Styled.DroppableItemSlot>
    )
}
