import { Move, Presets, RpgEvent } from "@rpgjs/server";
import { HpComponentToggle } from "../components/HPComponentToggle";
import { FollowManager } from "../../../modules/enemies/src/follow/FollowManager";
import Drop from "../../../modules/inventory-extension/src/interfaces/Drop";
import DeathAnimation from "../../graphics/DeathAnimation";
import { MobHPRecovery } from "../../combat/recovery/MobHPRecovery";
import { MobCombatManager } from "../../../modules/enemies/src/attack/MobAttackManager";
import { Utils } from "@rpgjs/common";
import { SpeedUpMobManager } from "../../../modules/enemies/src/speed-up/SpeedUpMobManager";

export class KillableMob extends RpgEvent {
    hpRecoveryTimer: NodeJS.Timer | null = null;
    attackSpeed: number = 1;
    expToGainAfterKill: number = 0;
    goldToGainRange: [number, number];
    deathGraphic: string = 'mob-vaporization-white-1';
    hpComponent: HpComponentToggle = new HpComponentToggle();
    canPreviewProfile?: boolean | undefined = true;

    getItemsToDrop(): Drop[] {
        return [];
    };

    onInit({ maxHp }: { maxHp: number }) {
        this.through = false;
        this.throughOtherPlayer = false;
        this.speedBase = 1;
        this.speed = 1;

        this.addParameter(Presets.MAXHP, {
            start: maxHp,
            end: maxHp,
        });
        this.recovery({ hp: 1 });

        MobHPRecovery.enable(this);

        this.infiniteMoveRoute([
            Move.tileRandom()
        ])
    }

    onDead() {
        this.setDead(true);

        this.stopMoveTo();
        this.breakRoutes(true)

        this.remove();

        DeathAnimation.play({
            map: this.getCurrentMap(),
            position: this.position,
            graphic: this.deathGraphic
        });
    }

    onHit() {
        this.hpComponent.showAndHideAfter(this);
    }
}

const originalInitializeMethod = KillableMob.prototype.initialize;
KillableMob.prototype.initialize = function() {
    originalInitializeMethod.apply(this);

    this.dead = false;
    this.fightingWithId = null;
    this.stuck = false;
    this.attackSpeed = 1;
    this.attackRange = 100;
    this.physicalAttackObserver = null;
    this.speedUpPercentage = 1;
    this.speedTmp = null;
    this.poppingNumber = {};
}

export interface KillableMob extends RpgEvent, MobCombatManager, FollowManager, SpeedUpMobManager {
}

Utils.applyMixins(KillableMob, [MobCombatManager, FollowManager, SpeedUpMobManager]);
