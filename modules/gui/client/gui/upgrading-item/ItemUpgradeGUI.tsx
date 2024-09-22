import { DndProvider } from "react-dnd";
import { DroppableItemSlot } from "../../components/upgrading-item/DroppableItemSlot.tsx";
import * as Styled from "./ItemUpgradeGUI.styles.ts";
import { HTML5Backend } from "react-dnd-html5-backend";
import { NextLevelParamCalculator } from "../../../../upgrading-items/server/src/service/NextLevelParamCalculator.ts";
import { RpgGui } from "@rpgjs/client";
import { useContext } from "react";
import { RpgReactContext } from "@rpgjs/client/react";
import { UpgradeItemAction } from "../../../../upgrading-items/server/src/UpgradingItemInteractionHooks.ts";
import { ItemsNeededToUpgradeSection } from "../../components/upgrading-item/ItemsNeededToUpgrade.tsx";
import { ItemContract } from "../../../../inventory-extension/src/contracts/ItemContract.ts";
import { isNil } from "../../../../../src/shared/utils/Utils.ts";

interface Props {
    item?: ItemContract;
}

export default function ItemUpgradeGUI({ item }: Props) {
    const { rpgSocket } = useContext(RpgReactContext);
    const socket = rpgSocket();

    const handleCloseGUI = () => {
        RpgGui.hide('item-upgrade-gui');
    }

    const handleUpgradeItem = () => {
        if (!item?.id) {
            return;
        }

        socket.emit('item.upgrade', {
            itemId: item?.id
        } as UpgradeItemAction);

        handleCloseGUI();
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <Styled.ItemUpgradeBox>
                <Styled.ItemUpgradeBoxTopLeftCorner />
                <Styled.ItemUpgradeBoxTopRightCorner />
                <Styled.ItemUpgradeBoxBottomLeftCorner />
                <Styled.ItemUpgradeBoxBottomRightCorner />

                {!item && <Styled.Title>Drag an item here</Styled.Title>}

                <Styled.DescribeItemWrapper>
                    <DroppableItemSlot iconName={item?.icon} />
                    <Styled.ItemName>{item?.name}</Styled.ItemName>
                </Styled.DescribeItemWrapper>

                {item && <Styled.DetailsWrapper>
                    <Styled.CurrentItemDetails style={{ marginRight: '32px' }}>
                        {!isNil(item?.level) && <Styled.ItemDetail>Item level: {item.level}</Styled.ItemDetail>}
                        {!isNil(item?.atk) && <Styled.ItemDetail>ATK: {item.atk}</Styled.ItemDetail>}
                        {!isNil(item?.pdef) && <Styled.ItemDetail>DEF: {item.pdef}</Styled.ItemDetail>}
                    </Styled.CurrentItemDetails>
                    {item && <Styled.ArrowRightIcon />}
                    <Styled.CurrentItemDetails style={{ marginLeft: '32px', textAlign: 'right', color: 'yellow' }}>
                        {!isNil(item?.level) && <Styled.ItemDetail>Item level: {item.level + 1}</Styled.ItemDetail>}
                        {!isNil(item?.atk) && <Styled.ItemDetail>ATK: {NextLevelParamCalculator.atk(item.atk)}</Styled.ItemDetail>}
                        {!isNil(item?.pdef) && <Styled.ItemDetail>DEF: {NextLevelParamCalculator.pdef(item.pdef)}</Styled.ItemDetail>}
                    </Styled.CurrentItemDetails>
                </Styled.DetailsWrapper>}

                {item && !isNil(item.level) && <ItemsNeededToUpgradeSection item={item} />}

                {item && <Styled.Actions>
                    <Styled.Button onClick={handleUpgradeItem}>Upgrade</Styled.Button>
                    <Styled.Button onClick={handleCloseGUI}>Cancel</Styled.Button>
                </Styled.Actions>}
            </Styled.ItemUpgradeBox>
        </DndProvider>
    )
}
