import { PlayerType } from '@rpgjs/types';
import { EquippedCharacterPreview } from '../shared/character/EquippedCharacterPreview.tsx';
import * as Styled from './../../gui/profile/ProfileGUI.styles'
import { LevelIcon } from './LevelIcon.tsx';

interface Props {
    unit: any,
}

export const ProfilePreview = ({
    unit,
}: Props) => {
    if (!unit) {
        return null;
    }

    const hp = Math.round(unit.hp);
    const mana = Math.round(unit.sp);
    const level = unit.level;
    const maxHp = Math.round(unit.param.maxHp);
    const maxMana = Math.round(unit.param.maxSp);
    const manaBarWidth = Math.min((mana / maxMana) * 100, 100) + '%';
    const hpBarWidth = Math.min((hp / maxHp) * 100, 100) + '%';

    const isPlayer = unit.type === PlayerType.Player;
    const customPreviewParams = unit.previewCustomParams;

    return (
        <Styled.ProfileGui>
            <LevelIcon level={level}></LevelIcon>
            {unit.graphics && unit.graphics.base &&
                <Styled.ProfilePreview>
                    {isPlayer
                        ? <EquippedCharacterPreview graphics={unit.graphics} top={60} left={50} scale={2} position={{ x: 0, y: -128 }} />
                        : <EquippedCharacterPreview
                            graphics={unit.graphics}
                            top={0}
                            left={0}
                            scale={customPreviewParams.scale || 1}
                            position={customPreviewParams.position || { x: 0, y: 0 }}
                            width={unit.width}
                            height={unit.height}
                            marginTop={customPreviewParams.marginTop || 0}
                        />
                    }
                </Styled.ProfilePreview>
            }
            <Styled.HpBar>
                <Styled.Text>{hp} / {maxHp}</Styled.Text>
                <Styled.FillRed style={{ width: hpBarWidth }}></Styled.FillRed>
            </Styled.HpBar>
            <Styled.ManaBar>
                <Styled.Text>{mana} / {maxMana}</Styled.Text>
                <Styled.FillBlue style={{ width: manaBarWidth }}></Styled.FillBlue>
            </Styled.ManaBar>
        </Styled.ProfileGui>
    )
}
