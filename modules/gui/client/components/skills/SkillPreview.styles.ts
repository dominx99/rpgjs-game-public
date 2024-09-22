import styled from "styled-components";

export const SkillPreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

export const SkillName = styled.div`
    font-weight: bold;
    margin-bottom: ${({ theme }) => theme.spacing(5)};
`

export const SkillDescription = styled.div`
    font-size: ${({ theme }) => theme.typography.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing(5)};
`

export const SkillCost = styled.div`
    font-size: ${({ theme }) => theme.typography.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing(5)};

    span {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text.cyan};
    }
`

export const SkillCooldown = styled.div`
    font-size: ${({ theme }) => theme.typography.sizes.small};
    margin-bottom: ${({ theme }) => theme.spacing(5)};

    span {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text.info};
    }
`

export const SkillDamage = styled.div`
    font-size: ${({ theme }) => theme.typography.sizes.small};

    .ad {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text.cyan};
    }

    .ap {
        font-weight: bold;
        color: ${({ theme }) => theme.colors.text.purple};
    }
`
