import { Components } from "@rpgjs/server";
import { KillableMob } from "../mobs/KillableMob";

export class HpComponentToggle {
    timer: NodeJS.Timeout | null = null;

    showAndHideAfter(mob: KillableMob, timeout: number = 5000) {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        mob.setComponentsTop([
            Components.hpBar(),
        ]);

        this.timer = setTimeout(() => {
            if (!mob.id || !mob.getCurrentMap()?.id || mob.isDead()) {
                return
            }

            mob.removeComponents('top');
        }, timeout);
    }
}
