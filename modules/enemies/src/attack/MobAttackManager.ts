import { RpgMap, RpgPlayer } from "@rpgjs/server";
import { Subscription, interval, takeWhile } from "rxjs";
import { GuidedAttack } from "../../../../src/enemies/attacks/GuidedAttack";
import { PhysicalAttack } from "../../../../src/enemies/attacks/PhysicalAttack";
import { AOEAttack } from "../../../../src/enemies/attacks/AOEAttack";

export interface MobCombatManager extends RpgPlayer {
    getCurrentMap<T extends RpgMap = RpgMap>(): T | null;
}

export class MobCombatManager {
    dead: boolean = false;
    attackSpeed: number = 1;
    attackRange: number = 100;
    fightingWithId: string | null = null;
    physicalAttackObserver: Subscription | null = null;
    physicalAttackInstance: GuidedAttack | PhysicalAttack | AOEAttack;

    setPhysicalAttackInstance(physicalAttackInstance: GuidedAttack | PhysicalAttack | AOEAttack): void {
        this.physicalAttackInstance = physicalAttackInstance;
    }

    setAttackSpeed(attackSpeed: number): void {
        this.attackSpeed = attackSpeed;
    }

    isDead(): boolean {
        return this.dead;
    }

    setDead(dead: boolean): void {
        this.dead = dead;
    }

    stopFight(): void {
        this.fightingWithId = null;
        this.physicalAttackObserver?.unsubscribe();
    }

    physicalAttackLoop(victim: RpgPlayer): void {
        if (this.dead || this.fightingWithId !== null) {
            return;
        }

        this.fightingWithId = victim.id;

        if (this.physicalAttackObserver) {
            this.physicalAttackObserver.unsubscribe();
        }

        this.physicalAttackObserver = interval(1000 / this.attackSpeed)
            .pipe(
                takeWhile(() => this.hp > 0),
                takeWhile(() => this.fightingWithId !== null),
                takeWhile(() => victim.getCurrentMap() !== undefined),
                takeWhile(() => victim.getCurrentMap()?.id === this.getCurrentMap()?.id),
            )
            .subscribe(() => this.singlePhysicalAttack(victim));
    }

    singlePhysicalAttack(attacker: RpgPlayer) {
        const map = this.getCurrentMap();

        if (!map) {
            return;
        }

        const distanceWith = attacker.position.distanceWith(this.position);

        if (distanceWith > this.attackRange) {
            return;
        }

        this.physicalAttackInstance.attack(map, this, attacker);
    }
}

