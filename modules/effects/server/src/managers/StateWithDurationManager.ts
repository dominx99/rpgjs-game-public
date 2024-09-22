type StateClass = { new(...args: any[]) }

export interface StateWithDurationManager {
    addState(stateClass: StateClass | string, chance: number): object | null;
    removeState(stateClass: StateClass | string, chance: number): void;
    getState(stateClass: StateClass | string): any;
}

export interface StateTimer {
    timer: NodeJS.Timeout;
    until: number;
    since: number;
}

export class StateWithDurationManager {
    stateTimers: { [key: string]: StateTimer } = {};

    addStateWithDuration(stateClass: StateClass | string, chance = 1, duration: number | null = null): void {
        let state = this.getState(stateClass);
        const stateTimer = this.stateTimers[state?.id];
        const newUntil = (Date.now() + (duration || 0));

        if (state && stateTimer && stateTimer.until > newUntil) {
            return;
        }

        if (state && stateTimer) {
            this.clearStateTimer(state.id);
        }

        this.addState(stateClass, chance);
        state = this.getState(stateClass);

        if (!duration) {
            return;
        }

        this.addStateTimer(state, stateClass, duration);
    }

    private addStateTimer(state: any, stateClass: StateClass | string, duration: number): void {
        this.stateTimers[state.id] = {
            timer: setTimeout(() => {
                this.removeState(stateClass, 1);
            }, duration),
            since: Date.now(),
            until: Date.now() + duration,
        }
    }

    private clearStateTimer(id: string): void {
        const stateTimer = this.stateTimers[id];

        if (!stateTimer || !stateTimer.timer) {
            return;
        }

        clearTimeout(stateTimer.timer);
    }
}
