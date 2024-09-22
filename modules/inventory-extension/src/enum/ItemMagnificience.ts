export enum Magnificence {
    LOWEST = 1,
    LOW = 2,
    MEDIUM = 3,
    HIGH = 4,
    HIGHEST = 5,
}

export const MagnificenceName = (magnificence: Magnificence) => {
    return {
        [Magnificence.LOWEST]: "Lowest",
        [Magnificence.LOW]: "Low",
        [Magnificence.MEDIUM]: "Medium",
        [Magnificence.HIGH]: "High",
        [Magnificence.HIGHEST]: "Highest",
    }[magnificence];
}
