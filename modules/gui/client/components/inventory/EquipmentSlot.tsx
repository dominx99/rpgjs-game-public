import { ItemEntity } from "rpgjs-inventory";
import * as Styled from '../../gui/inventory/Inventory.styles.ts';
import { RpgReactContext } from "@rpgjs/client/react";
import { useContext } from "react";
import { ItemTooltip } from "./ItemTooltip.tsx";
import { ItemPreview } from "./ItemPreview.tsx";
import { renderToString } from "react-dom/server";
import { GUIWrapper } from "../shared/GUIWrapper.tsx";
import { ItemContract } from "../../../../inventory-extension/src/contracts/ItemContract.ts";

interface Props {
    item: ItemContract | null;
    x: number;
    y: number;
}

export const EquipmentSlot = ({ item, x, y }: Props) => {
    if (!item) {
        return null;
    }

    const { rpgResource, rpgSocket } = useContext(RpgReactContext);
    const socket = rpgSocket();

    const icon = item ? rpgResource.spritesheets.get(item.icon).image : '';

    const unEquipItem = () => {
        if (!item.type) {
            console.error('No item type', item);
            return;
        }

        socket.emit('inventory.unEquip', item.type);
    }

    const randomItemId = Math.random().toString(36).substring(7);

    return (
        <>
            <ItemTooltip id={randomItemId} />
            <Styled.EquipmentSlot
                data-tooltip-id={randomItemId}
                data-tooltip-html={
                    renderToString(
                        <GUIWrapper>
                            <ItemPreview item={item} />
                        </GUIWrapper>
                    )
                }
                onDoubleClick={unEquipItem}
                onContextMenu={unEquipItem}
                $x={x}
                $y={y}
                $src={icon}
            />
        </>
    )
}
