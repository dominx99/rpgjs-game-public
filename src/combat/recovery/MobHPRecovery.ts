import { Presets, RpgEvent } from "@rpgjs/server";
import { interval, takeUntil, takeWhile } from "rxjs";

export class MobHPRecovery {
    static enable(event: RpgEvent) {
        interval(1000)
            .pipe(
                takeWhile(() => event.hp > 0),
                takeUntil(event._destroy$),
            )
            .subscribe({
                next: () => {
                    if (event.hp >= event.getParamValue(Presets.MAXHP)) {
                        return;
                    }

                    event.recovery({ hp: (event.hp / event.getParamValue(Presets.MAXHP)) + 0.01 });
                },
            });
    }
}
