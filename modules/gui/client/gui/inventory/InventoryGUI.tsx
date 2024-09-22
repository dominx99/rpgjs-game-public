import { RpgReactContext } from '@rpgjs/client/react';
import { useContext, useEffect, useState } from 'react';
import * as Styled from './Inventory.styles';
import { DraggableItemWithPreview } from '../../components/inventory/DraggableItemWithPreview.tsx';
import { InventoryMapper } from '../../src/InventoryMapper.ts';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableItemLayer } from '../../components/inventory/DraggableItemLayer.tsx';
import { useKeyModifier } from '@reactuses/core';
import { ConfirmAmountDialog } from '../../components/inventory/ConfirmAmountDialog.tsx';
import { InventorySpillArea } from '../../components/inventory/InventorySpillArea.tsx';
import { EquipmentSlot } from '../../components/inventory/EquipmentSlot.tsx';
import { ConfirmDialog } from '../../components/shared/ConfirmDialog.tsx';
import { EquippedCharacterPreview } from '../../components/shared/character/EquippedCharacterPreview.tsx';
import { GUIWrapper } from '../../components/shared/GUIWrapper.tsx';
import hash from 'object-hash';
import { PlayerGraphics } from '../../../../../src/graphics/PlayerGraphics.ts';

export default function InventoryGUI() {
    const { rpgCurrentPlayer } = useContext(RpgReactContext);
    const [splitCallback, setSplitCallback] = useState<((amount: number) => void) | null>(null);
    const [spillCallback, setSpillCallback] = useState<((amount?: number) => void) | null>(null);
    const [spillWithAmount, setSpillWithAmount] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [gold, setGold] = useState(0);

    const splitActive = useKeyModifier('Control');

    const [rawItems, setRawItems] = useState(null);
    const [rawInventory, setRawInventory] = useState<any>(null);
    const [inventoryHash, setInventoryHash] = useState(null);
    const [nativeEquipment, setNativeEquipment] = useState(null);
    const [playerGraphics, setPlayerGraphics] = useState<PlayerGraphics | null>(null);

    useEffect(() => {
        const subscription = rpgCurrentPlayer.subscribe(({ object }) => {
            if (object.gold) {
                setGold(object.gold);
            }

            if (!object || !object.inventory || !object.items) {
                return;
            }

            setRawItems(object.items);
            setRawInventory(object.inventory);
            setNativeEquipment(object.equipments);
            setInventoryHash(hash(object.inventory || ''));
            if (object.graphics) {
                setPlayerGraphics(object.graphics);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const onAcceptSplit = (amount: number) => {
        if (!splitCallback) {
            return;
        }

        splitCallback(amount);
        setSplitCallback(null);
    };

    const onCancelSplit = () => {
        setSplitCallback(null);
    };

    const onAcceptSpill = (amount?: number) => {
        if (!spillCallback) {
            return;
        }

        spillCallback(amount);
        setSpillCallback(null);
    }

    const onCancelSpill = () => {
        setSpillCallback(null);
    }

    const equipment = InventoryMapper.mapEquipment(nativeEquipment, rawInventory?.equipment)

    return (
        <GUIWrapper>
            <DndProvider backend={HTML5Backend}>
                {isDragging && <InventorySpillArea />}
                <DraggableItemLayer />
                {splitCallback && <ConfirmAmountDialog
                    title="How much do you want to split?"
                    onAccept={onAcceptSplit}
                    onCancel={onCancelSplit}
                />}
                {spillCallback && spillWithAmount && <ConfirmAmountDialog
                    title="How much do you want to drop?"
                    onAccept={onAcceptSpill}
                    onCancel={onCancelSpill}
                />}
                {spillCallback && !spillWithAmount && <ConfirmDialog
                    title="Are sure you want to drop this item?"
                    onAccept={onAcceptSpill}
                    onCancel={onCancelSpill}
                />}
                <Styled.Inventory>
                    <Styled.CharacterPreviewContainer>
                        <EquippedCharacterPreview graphics={playerGraphics} top={60} left={50} scale={4} position={{ x: 0, y: -128 }} />
                    </Styled.CharacterPreviewContainer>
                    <Styled.GoldContainer>
                        <Styled.GoldIcon />
                        <Styled.GoldAmount>{gold}</Styled.GoldAmount>
                    </Styled.GoldContainer>
                    <Styled.EquipmentContainer>
                        <EquipmentSlot x={0} y={0} item={equipment?.weapon} />
                        <EquipmentSlot x={0} y={66} item={equipment?.shield} />
                        <EquipmentSlot x={0} y={132} item={equipment?.plate} />
                    </Styled.EquipmentContainer>
                    <Styled.ItemsContainer>
                        {InventoryMapper.mapItems(rawInventory, rawItems).map((item, index) => {
                            return (
                                <DraggableItemWithPreview
                                    splitActive={splitActive}
                                    key={(item?.item.id || '') + index.toString()}
                                    item={item}
                                    slot={index}
                                    setSplitCallback={setSplitCallback}
                                    setSpillCallback={setSpillCallback}
                                    setSpillWithAmount={setSpillWithAmount}
                                    setIsDragging={setIsDragging}
                                />
                            )
                        })}
                    </Styled.ItemsContainer>
                </Styled.Inventory>
            </DndProvider>
        </GUIWrapper>
    );
}
