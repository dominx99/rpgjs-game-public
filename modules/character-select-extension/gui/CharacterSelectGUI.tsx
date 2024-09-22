import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { CharacterPreview } from '../../gui/client/components/shared/character/CharacterPreview.tsx';
import * as Styled from './CharacterSelectGUI.styles';
import { ActorContract } from '../src/contracts/ActorContract.ts';
import { RpgReactContext } from '@rpgjs/client/react';

interface Props {
    actors: { [key: string]: ActorContract }
}

export default function CharacterSelectGUI({ actors }: Props) {
    const { rpgGuiInteraction } = useContext(RpgReactContext);

    const [currentActorId, setCurrentActorId] = useState<string | null>(null);
    const [currentActor, setCurrentActor] = useState<ActorContract | null>(null);

    useEffect(() => {
        const [firstActor] = Object.values(actors) as ActorContract[];

        setCurrentActorId(firstActor.id);
    }, [])

    useMemo(() => {
        if (!currentActorId) {
            setCurrentActor(null);

            return;
        }

        setCurrentActor(actors[currentActorId]);
    }, [currentActorId]);

    const graphics = useCallback(() => {
        if (!currentActorId) {
            return [];
        }

        const actor = actors[currentActorId];
        return [
            ...actor.class.graphics.pernament,
            ...Object.values(actor.class.graphics.baseEquipment),
        ];
    }, [currentActorId]);

    const handlePreviousCharacter = () => {
        const ids = Object.keys(actors);

        const currentIndex = ids.findIndex(id => id === currentActorId);
        const previousIndex = currentIndex - 1;

        if (previousIndex < 0) {
            setCurrentActorId(ids[ids.length - 1]);
        } else {
            setCurrentActorId(ids[previousIndex]);
        }
    };

    const handleNextCharacter = () => {
        const ids = Object.keys(actors);

        const currentIndex = ids.findIndex(id => id === currentActorId);
        const nextIndex = currentIndex + 1;

        if (nextIndex > ids.length - 1) {
            setCurrentActorId(ids[0]);
        } else {
            setCurrentActorId(ids[nextIndex]);
        }
    };

    const handleStart = () => {
        rpgGuiInteraction('character-select-gui', 'character-selected', {
            actorId: currentActorId,
        })
    }

    if (!currentActorId || !currentActor) {
        return null;
    }

    return (
        <Styled.CharacterSelectGUI>
            <Styled.CharacterSelectPreviewWrapper>
                <CharacterPreview scale={5} graphics={graphics()} position={{ x: 0, y: -128 }} />
            </Styled.CharacterSelectPreviewWrapper>
            <Styled.DescriptionWrapper>
                <Styled.DescriptionContent>
                    <Styled.DescriptionTitle>
                        <Styled.ClassIcon $type={currentActor.class.type} />
                        <Styled.DescriptionTitleText>{currentActor.name}&nbsp;</Styled.DescriptionTitleText>
                        <Styled.DescriptionTitleText className={'character-select__class-name'}>{currentActor.class.name}</Styled.DescriptionTitleText>
                    </Styled.DescriptionTitle>
                    <Styled.DescriptionText>{currentActor.description}</Styled.DescriptionText>
                </Styled.DescriptionContent>
            </Styled.DescriptionWrapper>
            <Styled.ArrowLeft onClick={handlePreviousCharacter} />
            <Styled.ArrowRight onClick={handleNextCharacter} />
            <Styled.SubmitButton onClick={handleStart}>Start</Styled.SubmitButton>
        </Styled.CharacterSelectGUI>
    )
}
