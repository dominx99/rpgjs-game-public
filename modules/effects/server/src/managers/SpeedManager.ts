import { Speed } from "@rpgjs/server";

interface SpeedEffect {
    id: string;
    percentage: number;
    duration: number;
    timer: NodeJS.Timeout;
}

export interface SpeedManager {
    speedBase: Speed;
    speed: Speed;
}

export class SpeedManager {
    speedEffects: SpeedEffect[] = [];
    speedBase: Speed = Speed.Normal;

    addSpeedEffect(id: string, percentage: number, duration: number) {
        const speedEffect = this.getSpeedEffect(id);

        if (speedEffect) {
            this.removeSpeedEffect(id);
        }

        const timer = setTimeout(() => {
            this.removeSpeedEffect(id);
        }, duration);

        this.speedEffects.push({
            id,
            percentage,
            duration,
            timer,
        });

        this.updatePlayerSpeed();
    }

    removeSpeedEffect(id: string) {
        const speedEfect = this.getSpeedEffect(id);

        if (!speedEfect) {
            return;
        }

        clearTimeout(speedEfect.timer);
        this.speedEffects = this.speedEffects.filter((speedEffect) => speedEffect.id !== id);

        this.updatePlayerSpeed();
    }

    getSpeedEffect(id: string): SpeedEffect | null {
        return this.speedEffects.find((speedEfect) => speedEfect.id === id) || null;
    }

    updatePlayerSpeed(): void {
        const originalSpeed = this.speedBase;

        const speed = this.speedEffects.reduce((speed, speedEffect) => {
            return speed * speedEffect.percentage;
        }, originalSpeed);

        this.speed = Math.round(speed * 100) / 100;
    }
}
