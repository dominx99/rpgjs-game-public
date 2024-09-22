import { EventData, Move, Presets, Speed } from '@rpgjs/server';
import { KillableMob } from './../../../../src/enemies/mobs/KillableMob';
import Drop from '../../../inventory-extension/src/interfaces/Drop';
import CircleShield from '../../../items/database-random/armors/shields/CircleShield';
import BigSword from '../../../items/database-random/weapons/swords/BigSword';
import SteelPlate from '../../../items/database-random/armors/plate/SteelPlate';
import { AOEAttack } from '../../../../src/enemies/attacks/AOEAttack';

// @ts-ignore
@EventData({
    name: 'Desert golem',
    hitbox: {
        width: 32,
        height: 48
    }
})
export default class DesertGolem extends KillableMob {
    expToGainAfterKill: number = 200;
    goldToGainRange: [number, number] = [3, 8];

    getItemsToDrop(): Drop[] {
        return [
            {
                probability: 800,
                item: CircleShield,
            },
            {
                probability: 800,
                item: BigSword,
            },
            {
                probability: 800,
                item: SteelPlate,
            }
        ];
    }

    onInit() {
        this.width = 32;
        this.height = 48;
        this.previewCustomParams = {
            marginTop: 10,
            scale: 1.5,
        }
        this.setGraphic('desert-golem');
        this.graphics = {
            base: ['desert-golem'],
        }

        super.onInit({
            maxHp: 500
        });

        this.initialLevel = 3;

        this.paramsModifier = {
            [Presets.ATK]: {
                value: 10
            }
        }

        this.setPhysicalAttackInstance(new AOEAttack({
            graphic: 'green-ball-explosion',
            animationName: 'attack',
        }));

        this.speed = Speed.Slow;
        this.infiniteMoveRoute([
            Move.tileRandom()
        ])
    }
}
