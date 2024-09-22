import { useContext, useEffect, useState } from 'react';
import * as Styled from './ActionBar.styles';
import { RpgReactContext } from '@rpgjs/client/react';
import { Action } from '../../components/action-bar/Action.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isNil } from '../../../../../src/shared/utils/Utils.ts';
import { Slot } from 'rpgjs-inventory';
import { getInventoryBackpackItemBySlot } from '../../src/inventory/Utils.ts';
import { ActionContract, MappedActionContract } from '../../../../actions/server/src/interface/ActionContract.ts';
import { ActionType } from '../../../../actions/server/src/ActionManager.ts';
import { DraggableActionLayer } from '../../components/action-bar/DraggableActionLayer.tsx';
import { ActionSpillArea } from '../../components/action-bar/ActionSpillArea.tsx';
import { CooldownContract } from '../../../../cooldowns/src/contracts/CooldownContract.ts';
import { GUIWrapper } from '../../components/shared/GUIWrapper.tsx';

export default function ActionBarGUI() {
    const [xpBarWidth, setXpBarWidth] = useState(0);
    const { rpgCurrentPlayer } = useContext(RpgReactContext);
    const [actions, setActions] = useState<Array<MappedActionContract | null>>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [exp, setExp] = useState<number>(0);
    const [expForNextLevel, setExpForNextLevel] = useState<number>(0);

    useEffect(() => {
        const subscription = rpgCurrentPlayer.subscribe(({ object }) => {
            if (!object || isNil(object.exp) || isNil(object.expForNextlevel) || isNil(object.inventory)) {
                return;
            }

            const exp = object.exp - object.expForCurrentLevel
            const expForNextLevel = object.expForNextlevel - object.expForCurrentLevel

            setExp(exp);
            setExpForNextLevel(expForNextLevel);
            setXpBarWidth(Math.min((exp / expForNextLevel) * 100, 100) * 3.41);
            let actions = updateQuantityOfActions(object.inventory, mapActions(object.actions || []))
            actions = updateCooldownOfActions(object.cooldowns, actions);
            setActions(actions);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);


    const getItemQuantity = (inventory: any, slot: Slot) => {
        const backpackItem = getInventoryBackpackItemBySlot(inventory, slot);

        if (!backpackItem) {
            return 1;
        }

        return backpackItem.nb;
    }

    const updateQuantityOfActions = (inventory: any, actions: Array<ActionContract | null>): Array<MappedActionContract | null> => {
        return actions.map(action => {
            if (!action) {
                return null;
            }

            if (action.type !== ActionType.Item || isNil(action.meta?.slot?.slot)) {
                return action;
            }

            const quantity = getItemQuantity(inventory, action.meta.slot);

            return {
                ...action,
                quantity,
            };
        });
    }

    const mapActions = (actions: ActionContract[]): Array<ActionContract | null> => {
        actions = Object.values(actions).filter(action => action !== null);

        return Array(7).fill(null).map((_, index) => {
            const action = actions.find(action => action.key === index + 1);

            return action || null;
        });
    }

    const updateCooldownOfActions = (cooldowns: CooldownContract[], actions: Array<MappedActionContract | null>): Array<MappedActionContract | null> => {
        if (!cooldowns) {
            return actions;
        }

        return actions.map(action => {
            const cooldown = Object.values(cooldowns).find(
                (cooldown: CooldownContract) => cooldown.id === action?.id && cooldown.type.valueOf() === action?.type.valueOf()
            );

            if (!cooldown || !action) {
                return action;
            }

            action.cooldownTime = cooldown.after;

            return action;
        });
    }

    return (
        <GUIWrapper>
            <DndProvider backend={HTML5Backend}>
                {isDragging && <ActionSpillArea />}
                <DraggableActionLayer />
                <Styled.ActionBar>
                    <Styled.ActionsContainer>
                        {actions.map((action, index) =>
                            <Action
                                key={(action?.id || '') + index}
                                slot={index}
                                action={action}
                                setIsDragging={setIsDragging}
                            />
                        )}
                    </Styled.ActionsContainer>
                    <Styled.XPBar $width={xpBarWidth}>
                        <Styled.XPBarText>
                            {exp} / {expForNextLevel}
                        </Styled.XPBarText>
                    </Styled.XPBar>
                </Styled.ActionBar>
            </DndProvider>
        </GUIWrapper>
    )
}
