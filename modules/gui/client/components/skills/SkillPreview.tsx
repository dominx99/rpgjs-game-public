import { SkillContract } from '../../../../skills/src/contracts/SkillContract';
import * as Styled from './SkillPreview.styles';
import { getAttackDamageCoefficient, getMagicDamageCoefficient, hasAttackDamageCoefficient, hasMagicDamageCoefficient, hasMoreThanOneDamageCoefficient } from '../../../../skills/src/utils/SkillUtils';

interface Props {
    skill: SkillContract;
}

export const SkillPreview = ({ skill }: Props) => {
    return (
        <Styled.SkillPreviewWrapper>
            <Styled.SkillName>{skill.name}</Styled.SkillName>
            <Styled.SkillDescription>{skill.description}</Styled.SkillDescription>
            <Styled.SkillCost>Mana cost: <span>{skill.spCost}</span></Styled.SkillCost>
            <Styled.SkillCooldown>Cooldown: <span>{(skill.cooldown / 1000)}s</span></Styled.SkillCooldown>
            <Styled.SkillDamage>
                Damage: {hasAttackDamageCoefficient(skill) && (<><span className="ad">{getAttackDamageCoefficient(skill)}%</span> AD</>)}
                {hasMoreThanOneDamageCoefficient(skill) && <>&nbsp;+</>} {hasMagicDamageCoefficient(skill) && (<><span className="ap">{getMagicDamageCoefficient(skill)}%</span> AP</>)}
            </Styled.SkillDamage>
        </Styled.SkillPreviewWrapper>
    )
}

