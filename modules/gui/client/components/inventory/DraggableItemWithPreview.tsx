import { useContext, useEffect, useMemo, useState } from 'react';
import * as Styled from './DraggableItemWithPreview.styles';
import { RpgReactContext } from '@rpgjs/client/react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { InventoryManager } from '../../src/InventoryManager';
import { isNil } from '../../../../../src/shared/utils/Utils';
import { renderToString } from 'react-dom/server';
import { ItemTooltip } from './ItemTooltip.tsx';
import { ItemPreview } from './ItemPreview.tsx';
import { RpgGui } from '@rpgjs/client';
import { InventorySlotContract } from '../../../../inventory-extension/src/contracts/ItemContract.ts';
import { CanUpgradeItem } from '../../../../upgrading-items/client/src/CanUpgradeItem.ts';
import { useTheme } from 'styled-components';
import { GUIWrapper } from '../shared/GUIWrapper.tsx';

interface Props {
    item: InventorySlotContract | null;
    slot: number;
    splitActive: boolean;
    setSplitCallback: (callback: (amount: number) => void) => void;
    setSpillCallback: (callback: (amount?: number) => void) => void;
    setSpillWithAmount: (spillWithAmount: boolean) => void;
    setIsDragging: (isDragging: boolean) => void;
}

interface DropResult {
    name: string;
    slot?: number;
    item?: InventorySlotContract;
    spill?: boolean;
}

export const DraggableItemWithPreview = ({
    item,
    slot,
    splitActive,
    setSplitCallback,
    setSpillCallback,
    setSpillWithAmount,
    setIsDragging
}: Props) => {
    const { rpgResource, rpgSocket } = useContext(RpgReactContext);
    const socket = rpgSocket();

    const icon = item ? rpgResource.spritesheets.get(item.item.icon).image : '';

    const handleDropInInventory = (item: InventorySlotContract, dropResult: DropResult) => {
        const slot = dropResult.slot;
        const spill = !slot && dropResult.spill;

        if (spill && splitActive) {
            const callback = (amount?: number) => InventoryManager.dropItem(socket, item.slot, amount);

            setSpillWithAmount(true);
            setSpillCallback(() => callback);
        }

        if (spill && !splitActive) {
            const callback = () => InventoryManager.dropItem(socket, item.slot, item.nb);

            setSpillWithAmount(false);
            setSpillCallback(() => callback);
        }

        if (isNil(slot)) {
            return;
        }

        const sourceSlot = item.slot;
        const targetSlot = { backpack: 'main', slot };

        if (!splitActive) {
            InventoryManager.moveItem(socket, sourceSlot, targetSlot, item.nb);
        }

        if (splitActive) {
            const callback = (amount: number) => InventoryManager.moveItem(
                socket,
                sourceSlot,
                targetSlot,
                amount
            );

            setSplitCallback(() => callback);
        }
    }

    const handleDropToActionSlot = (item: InventorySlotContract, dropResult: DropResult) => {
        const slot = dropResult.slot;

        if (isNil(slot)) {
            return;
        }

        socket.emit('action-bar.set', {
            actionKey: slot + 1,
            action: {
                id: item.item.id,
                type: 'item',
                meta: {
                    slot: item.slot,
                }
            },
        })
    }

    const handleOpenUpgradeGUI = (item: InventorySlotContract) => {
        const canUpgradeItem = CanUpgradeItem.check(item.item);

        if (!canUpgradeItem) {
            return;
        }

        RpgGui.display('item-upgrade-gui', {
            item: item.item
        });
    }

    const [{ opacity, isDragging }, drag, dragPreview] = useDrag(() => ({
        type: 'item',
        item,
        canDrag: () => {
            return !!item;
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult() as DropResult;

            if (!item || !dropResult) {
                return;
            }

            switch (dropResult.name) {
                case 'item-slot':
                    handleDropInInventory(item, dropResult);
                    break;
                case 'action-slot':
                    handleDropToActionSlot(item, dropResult);
                    break
                case 'upgrade-item':
                    handleOpenUpgradeGUI(item);
            }
        }
    }), [item, splitActive]);

    dragPreview(getEmptyImage(), { captureDraggingState: true })

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: 'item',
        drop: () => ({ slot, item, name: 'item-slot' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))

    const useItem = () => {
        if (!item) {
            return;
        }

        if (RpgGui.get('item-upgrade-gui').display) {
            const canUpgradeItem = CanUpgradeItem.check(item.item);

            if (!canUpgradeItem) {
                return;
            }

            RpgGui.display('item-upgrade-gui', {
                item: item.item
            });

            return;
        }

        socket.emit('inventory.useItem', {
            itemId: item.item.id,
            slot: item.slot
        });
    }

    const [itemRandomId, setItemRandomId] = useState<string>('');

    useMemo(() => {
        setItemRandomId(Math.random().toString(36).substring(7));
    }, [item?.item.id]);

    useEffect(() => {
        setIsDragging(isDragging);
    }, [isDragging]);

    return (
        <>
            <ItemTooltip id={`item-tooltip-${itemRandomId}`} />
            <div
                ref={drop}
                onDoubleClick={useItem}
                onContextMenu={useItem}
                style={isOver && canDrop ? { backgroundColor: 'rgba(0, 255, 255, .3)' } : {}}
                data-tooltip-id={`item-tooltip-${itemRandomId}`}
                data-tooltip-html={
                    item &&
                    renderToString(
                        <GUIWrapper>
                            <ItemPreview item={item.item} />
                        </GUIWrapper>
                    )
                }
            >
                <Styled.Item ref={drag}>
                    <Styled.ItemImage style={{ opacity }} $src={icon} />
                    {(item?.nb || 0) > 1 && <Styled.ItemQuantity>{item?.nb}</Styled.ItemQuantity>}
                </Styled.Item>
            </div>
        </>
    )
}
