import { EventData, Move, Presets, Speed } from '@rpgjs/server';
import { KillableMob } from '../../../../src/enemies/mobs/KillableMob';
import Drop from '../../../inventory-extension/src/interfaces/Drop';
import SteelPlate from '../../../items/database-random/armors/plate/SteelPlate';
import BigSword from '../../../items/database-random/weapons/swords/BigSword';
import CircleShield from '../../../items/database-random/armors/shields/CircleShield';
import { GuidedAttack } from '../../../../src/enemies/attacks/GuidedAttack';
import MovingGreenFireBullet from '../bullets/MovingGreenFireBullet';
import Potion from '../../../../modules/items/database/consumables/Potion';

// @ts-ignore
@EventData({
    name: 'Flying eye',
    hitbox: {
        width: 32,
        height: 48
    }
})
export default class FlyingEye extends KillableMob {
    expToGainAfterKill: number = 50;
    goldToGainRange: [number, number] = [1, 3];

    getItemsToDrop(): Drop[] {
        return [
            {
                probability: 400,
                item: SteelPlate,
            },
            {
                probability: 400,
                item: BigSword,
            },
            {
                probability: 400,
                item: CircleShield,
            },
            {
                probability: 800,
                item: () => Potion,
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
        this.setGraphic(['flying-eye', 'mob-vaporization-white-1']);
        this.graphics = {
            base: ['flying-eye'],
        }

        super.onInit({
            maxHp: 400,
        });

        this.paramsModifier = {
            [Presets.ATK]: {
                value: 7
            }
        }

        this.setPhysicalAttackInstance(new GuidedAttack({
            graphic: 'moving-green-fire',
            animationName: 'attack',
            event: MovingGreenFireBullet,
        }));

        this.speed = Speed.Slow;
        this.infiniteMoveRoute([
            Move.tileRandom()
        ])
    }
}
