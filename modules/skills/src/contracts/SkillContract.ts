export interface SkillContract {
    id: string,
    name: string,
    description: string,
    spCost: number,
    icon: string,
    cooldown: number,
    coefficient: { [key: string]: number },
}

