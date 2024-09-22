import * as Styled from './LevelIcon.styles';

interface Props {
    level: number,
}

export const LevelIcon = ({ level }: Props) => {
    return (
        <Styled.LevelIconWrapper>
            {level}
        </Styled.LevelIconWrapper>
    )
}
