import { useContext } from 'react';
import * as Styled from './Skill.styles';
import { RpgReactContext } from '@rpgjs/client/react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { renderToString } from 'react-dom/server';
import { SkillPreview } from './SkillPreview.tsx';
import { GUIWrapper } from '../shared/GUIWrapper.tsx';

interface Props {
    skill: any;
}

interface DropResult {
    slot: number;
}

export const Skill = ({ skill }: Props) => {
    const { rpgResource, rpgSocket } = useContext(RpgReactContext);
    const socket = rpgSocket();
    const sprite = rpgResource.spritesheets.get(skill.icon);
    const icon = sprite ? sprite.image : '';

    const [{ opacity, isDragging }, drag, dragPreview] = useDrag(() => ({
        type: 'skill',
        item: skill,
        canDrag: () => {
            return !!skill;
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
            isDragging: monitor.isDragging(),
        }),
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult() as DropResult;

            if (!dropResult) {
                return;
            }

            socket.emit('action-bar.set', {
                actionKey: dropResult.slot + 1,
                action: {
                    id: skill.id,
                    type: 'skill',
                }
            })
        }
    }), [skill]);

    dragPreview(getEmptyImage(), { captureDraggingState: true })

    if (!icon || !drag) {
        return null;
    }

    return (
        <Styled.SkillFrame
            className="skill-anchor"
            data-tooltip-html={
                renderToString(
                    <GUIWrapper>
                        <SkillPreview skill={skill} />
                    </GUIWrapper>
                )
            }
            ref={drag}
            style={{
                boxShadow: isDragging ? '0 0 15px 1px rgba(0, 255, 255, .5)' : '',
                backgroundColor: isDragging ? 'rgba(0, 255, 255, .2)' : '',
            }}
        >
            <Styled.Skill $src={icon}></Styled.Skill>
        </Styled.SkillFrame>
    )
}
