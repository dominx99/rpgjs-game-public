import { Presets, RpgPlayer, RpgPlayerHooks, Speed } from "@rpgjs/server";
import { GraphicsOfPlayer, PlayerGraphics } from "../../src/graphics/PlayerGraphics";
import { PlayerHPRecovery } from "../../src/combat/recovery/PlayerHPRecovery";
import { PlayerSPRecovery } from "../../src/combat/recovery/PlayerSPRecovery";
import { PickUp } from "../inventory-extension/src/service/PickUp";
import { getMobsOnMap } from '../../src/shared/utils/maps/MapUtils';
import { PositionXY } from "@rpgjs/types";
import { graphicsSchemas } from "../../src/graphics/GraphicSchemas";
import { PlayerPhysicalAttackManager } from "./src/PlayerPhysicalAttackManager";
import { Utils } from "@rpgjs/common";
import { EquipmentsManager } from "./src/interface/EquipmentsManager";
import { PhysicalAttackInputHandler } from "./src/service/PhysicalAttackInputHandler";
import { PlayerVariablesManager } from "./src/variables/PlayerVariables";

declare module '@rpgjs/server' {
    export interface RpgPlayer extends PlayerPhysicalAttackManager, EquipmentsManager {
        graphics?: PlayerGraphics,
    }
}

const player: RpgPlayerHooks = {
    props: {
        graphics: graphicsSchemas,
    },

    onAuthSuccess(player: RpgPlayer) {
        PlayerVariablesManager.clear(player);

        player.recovery({ hp: 1 });

        player.paramsModifier = {
            [Presets.ATK]: {
                value: 24
            }
        };

        player.speed = Speed.Normal;

        GraphicsOfPlayer.sync(player);
    },
    onInput(player: RpgPlayer, { input }) {
        // TODO: Get mouse target on space clicked
        // if (input == Control.Attack) {
        //     ShowAnimation.withReplace(player, 'attack', 'bigslash');
        //
        //     player.physicalAttack(player);
        // }

        if (input === 'pickUp') {
            PickUp.fromGround(player);
        }
    },
    async onJoinMap(player: RpgPlayer) {
        PlayerHPRecovery.enable(player);
        PlayerSPRecovery.enable(player);

        player.off('physical-attack');
        player.on('physical-attack', (mousePosition: PositionXY) => PhysicalAttackInputHandler(player, mousePosition));
    },
    onLevelUp(player: RpgPlayer) {
        player.showAnimation('level-up', 'default');

        player.allRecovery();
    },
    async onDead(player: RpgPlayer) {
        const map = player.getCurrentMap();

        if (map) {
            getMobsOnMap(map)
                .filter(mob => mob.fightingWithId)
                .forEach(mob => {
                    mob.stopFight();
                })
        }

        await player.changeMap('grass-land1', {
            x: 1600,
            y: 1200,
        });

        player.allRecovery();
    },
}

Utils.applyMixins(RpgPlayer, [PlayerPhysicalAttackManager, EquipmentsManager]);

export default player;
