import { EventData, Move, Presets, Speed } from '@rpgjs/server';
import { KillableMob } from '../../../../src/enemies/mobs/KillableMob';
import Drop from '../../../inventory-extension/src/interfaces/Drop';
import SteelPlate from '../../../items/database-random/armors/plate/SteelPlate';
import CircleShield from '../../../items/database-random/armors/shields/CircleShield';
import BigSword from '../../../items/database-random/weapons/swords/BigSword';
import MovingBallBullet from '../bullets/MovingBallBullet';
import { GuidedAttack } from '../../../../src/enemies/attacks/GuidedAttack';

// @ts-ignore
@EventData({
    name: 'Purple magician',
    hitbox: {
        width: 32,
        height: 48
    }
})
export default class PurpleMagician extends KillableMob {
    expToGainAfterKill: number = 100;
    goldToGainRange: [number, number] = [2, 5];

    getItemsToDrop(): Drop[] {
        return [
            {
                probability: 500,
                item: SteelPlate,
            },
            {
                probability: 500,
                item: CircleShield,
            },
            {
                probability: 500,
                item: BigSword,
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
        this.setGraphic(['purple-magician', 'mob-vaporization-white-1']);
        this.graphics = {
            base: ['purple-magician'],
        }

        super.onInit({
            maxHp: 250
        });

        this.initialLevel = 3;

        this.paramsModifier = {
            [Presets.ATK]: {
                value: 15
            }
        }

        this.setPhysicalAttackInstance(new GuidedAttack({
            graphic: 'moving-ball',
            animationName: 'attack',
            event: MovingBallBullet,
        }));

        this.speed = Speed.Slow;
        this.infiniteMoveRoute([
            Move.tileRandom()
        ])
    }
}
