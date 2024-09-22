export const NextLevelParamCalculator = {
    atk: (currentValue: number): number => Math.round(currentValue * 1.05),
    pdef: (currentValue: number): number => Math.round(currentValue * 1.10),
    sdef: (currentValue: number): number => Math.round(currentValue * 1.10),
}
