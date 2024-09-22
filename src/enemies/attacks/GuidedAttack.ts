import { RpgEvent, RpgMap, RpgPlayer } from "@rpgjs/server";

export interface GuidedAttackOptions {
    event: typeof RpgEvent;
    graphic: string;
    animationName: string;
}

export class GuidedAttack {
    options: GuidedAttackOptions;

    constructor(options: GuidedAttackOptions) {
        this.options = options;
    }

    attack(map: RpgMap, attacker: RpgPlayer, victim: RpgPlayer) {
        const event = map.createDynamicEvent({
            x: attacker.position.x,
            y: attacker.position.y,
            event: this.options.event,
        });
        let startedClearProcess: boolean = false;

        const clearAttackAnimation = (event: RpgEvent, victim?: RpgPlayer | null) => {
            try {
                if (startedClearProcess) {
                    return;
                }
                startedClearProcess = true;

                event.showAnimation(this.options.graphic, this.options.animationName, true);

                if (victim !== null && victim !== undefined) {
                    victim.applyDamage(attacker);
                }

                event.remove();
            } catch (e: any) {
                console.log('Could not apply damage to victim, id: ', victim?.id);
            }
        }

        Object.entries(event).forEach(([eventId, event]) => {
            event.showAnimation(this.options.graphic, this.options.animationName, true);

            event.moveTo(victim, {
                onStuck: () => clearAttackAnimation(event),
                onComplete: () => clearAttackAnimation(event, victim),
                infinite: true,
            }).subscribe();

            setTimeout(() => clearAttackAnimation(event), 1000);
        });
    }
}
