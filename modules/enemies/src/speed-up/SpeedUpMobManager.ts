export interface SpeedUpMobManager {
    speed: number;
    addSpeedEffect(id: string, percentage: number, duration: number);
    removeSpeedEffect(id: string);
}

export class SpeedUpMobManager {
    speedUpPercentage: number = 1;

    speedUp() {
        this.addSpeedEffect('mob-speed-up', this.speedUpPercentage, 60 * 60 * 1000);
    }

    slowDown() {
        this.removeSpeedEffect('mob-speed-up');
    }
}
