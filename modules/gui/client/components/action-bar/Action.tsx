import { useContext, useEffect, useRef, useState } from "react";
import { MappedActionContract } from "../../../../actions/server/src/interface/ActionContract";
import { RpgReactContext } from "@rpgjs/client/react";
import * as Styled from './Action.styles';
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { isNil } from "../../../../../src/shared/utils/Utils";
import { mergeRefs } from "../../src/Utils";

interface Props {
    action: MappedActionContract | null;
    slot: number;
    setIsDragging: (isDragging: boolean) => void;
}

interface DropResult {
    name: string;
    slot?: number;
    spill?: boolean;
}

export const Action = ({ action, slot, setIsDragging }: Props) => {
    const { rpgResource, rpgSocket, rpgScene } = useContext(RpgReactContext);
    const socket = rpgSocket();
    const scene = rpgScene();

    const [currentTime, setCurrentTime] = useState<number>(Date.now());

    const refreshRate = 1000 / 60;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(currentTime + refreshRate);
        }, refreshRate);

        return () => {
            clearInterval(interval);
        }
    }, [currentTime])

    useEffect(() => {
        if (!scene) {
            return;
        }

        scene.valuesChange.subscribe((obj: any) => {
            if (!obj.time) {
                return;
            }

            setCurrentTime(obj.time);
        });
    }, [rpgScene]);

    const sprite = rpgResource.spritesheets.get(action?.instance?.icon)
    const icon = sprite ? sprite.image : '';

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: ['skill', 'item', 'action'],
        drop: () => ({ name: 'action-slot', slot }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }))
    const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
        type: 'action',
        item: action,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: (monitor) => {
            return !!action;
        },
        end: async (item, monitor) => {
            const dropResult = monitor.getDropResult() as DropResult;

            if (!dropResult || !item) {
                return;
            }

            await socket.emit('action-bar.remove', {
                actionKey: item.key
            });

            if (isNil(dropResult.slot) || dropResult.spill === true) {
                return;
            }

            await socket.emit('action-bar.set', {
                actionKey: dropResult.slot + 1,
                action: {
                    ...item
                }
            })
        }
    }), [action]);

    dragPreview(getEmptyImage(), { captureDraggingState: true })

    const el = useRef<HTMLDivElement>(null);

    let cooldown: string = '';
    let leftCooldown: number = 0;
    let cooldownPercentage: number = 0;

    if (!action?.cooldownTime || !action?.instance?.cooldown) {
        cooldown = '';
    }

    if (action?.cooldownTime) {
        leftCooldown = action?.cooldownTime - currentTime;
    }

    cooldown = (leftCooldown / 1000).toFixed(2);

    if (leftCooldown <= 0) {
        cooldown = '';
        el.current?.style.setProperty('--timeLeft', `0%`);
    }

    if (action?.instance?.cooldown) {
        cooldownPercentage = Math.round(leftCooldown / action?.instance?.cooldown * 100);
        el.current?.style.setProperty('--timeLeft', `${cooldownPercentage}%`);
    }

    useEffect(() => {
        setIsDragging(isDragging);
    }, [isDragging]);

    const refs = mergeRefs(el, drag);

    return (
        <Styled.ActionDroppable ref={drop}>
            <Styled.Action style={{
                backgroundColor: isOver && canDrop ? 'rgba(0, 255, 255, .3)' : 'transparent',
            }} ref={refs} $src={icon}>
                {cooldown && <Styled.ActionCooldown>{cooldown}</Styled.ActionCooldown>}
                <Styled.ActionQuantity>{action?.quantity}</Styled.ActionQuantity>
            </Styled.Action>
        </Styled.ActionDroppable>
    )
}
