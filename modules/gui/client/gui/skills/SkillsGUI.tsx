import { useContext, useEffect, useState } from 'react';
import * as Styled from './Skills.styles';
import { RpgReactContext } from '@rpgjs/client/react';
import { Skill } from '../../components/skills/Skill.tsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableSkillLayer } from '../../components/skills/DraggableSkillLayer.tsx';
import { SkillTooltip } from '../../components/skills/SkillTooltip.tsx';

export default function SkillsGUI() {
    const { rpgCurrentPlayer } = useContext(RpgReactContext)

    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const subscription = rpgCurrentPlayer.subscribe(({ object }) => {
            if (!object || !object.skills) {
                return;
            }

            setSkills(object.skills);
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <DraggableSkillLayer />
            <Styled.Skills>
                <Styled.SkillsContent>
                    {skills.map((skill, index) => (
                        <Skill key={index} skill={skill} />
                    ))}

                    {skills.length > 0 && <SkillTooltip anchorSelect=".skill-anchor" />}
                </Styled.SkillsContent>
            </Styled.Skills>

        </DndProvider>
    )
}
