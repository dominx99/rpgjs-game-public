export interface ParameterManager {
    expCurve: {
        basis: number
        extra: number
        accelerationA: number
        accelerationB: number
    },
    level: number
}

export class ParameterManager {
    expForLevel(level: number) {
        const {
            basis,
            extra,
            accelerationA,
            accelerationB
        } = this.expCurve
        return Math.round(basis * (Math.pow(level - 1, 0.9 + accelerationA / 250)) * level * (level + 1) / (6 + Math.pow(level, 2) / 50 / accelerationB) + (level - 1) * extra)
    }

    get expForCurrentLevel(): number {
        return this.expForLevel(this.level)
    }
}
