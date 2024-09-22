import { Move, RpgPlayer, RpgShape } from "@rpgjs/server";
import { Observable, timer } from "rxjs";
import { Direction, MoveTo, PositionXY } from "@rpgjs/types";
import { SpeedUpMobManager } from "../speed-up/SpeedUpMobManager";

type Routes = (string | Promise<any> | Direction | Direction[] | Function)[];

export interface FollowManager extends SpeedUpMobManager {
    breakRoutes(force?: boolean): void;
    stopMoveTo(): void;
    moveTo(position: RpgPlayer | RpgShape | PositionXY, options?: MoveTo): Observable<void>;
    infiniteMoveRoute(routes: Routes): void;
    stopFight(): void;
}

export class FollowManager {
    stuck: boolean = false;

    follow(attacker: RpgPlayer) {
        this.breakRoutes(true);
        this.stopMoveTo();
        this.speedUp();

        this.followPayer(attacker);
        timer(60000).subscribe({
            next: () => this.stopFollow()
        })
    }

    stopFollow() {
        this.slowDown();
        this.moveRandomly()
        this.stopFight();
    }

    followPayer(attacker: RpgPlayer) {
        this.moveTo(attacker).subscribe();
    }

    moveRandomly() {
        this.stopMoveTo();
        this.breakRoutes(true);
        this.infiniteMoveRoute([
            Move.tileRandom()
        ]);
    }
}
