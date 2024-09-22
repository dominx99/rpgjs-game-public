import { EventData, Presets, Speed } from '@rpgjs/server';
import { KillableMob } from '../../../../src/enemies/mobs/KillableMob';
import Drop from '../../../inventory-extension/src/interfaces/Drop';
import SteelPlate from '../../../items/database-random/armors/plate/SteelPlate';
import BigSword from '../../../items/database-random/weapons/swords/BigSword';
import CircleShield from '../../../items/database-random/armors/shields/CircleShield';
import Potion from '../../../../modules/items/database/consumables/Potion';
import { PhysicalAttack } from '../../../../src/enemies/attacks/PhysicalAttack';

// @ts-ignore
@EventData({
    name: 'Zombie',
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class Zombie extends KillableMob {
    expToGainAfterKill: number = 500;
    goldToGainRange: [number, number] = [4, 16];
    attackSpeed: number = 1.2;

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
        this.width = 64;
        this.height = 64;
        this.previewCustomParams = {
            marginTop: -7,
            scale: 1.3,
            position: {
                x: 0,
                y: -128
            }
        }
        this.setGraphic(['zombie-head', 'zombie-body', 'mob-vaporization-white-1']);
        this.graphics = {
            base: ['zombie-head', 'zombie-body'],
        }

        super.onInit({
            maxHp: 1500,
        });

        this.paramsModifier = {
            [Presets.ATK]: {
                value: 15
            }
        }

        this.setPhysicalAttackInstance(new PhysicalAttack({
            graphics: ['zombie-head', 'zombie-body'],
            animationName: 'attack'
        }));

        this.speed = Speed.Slow;
        this.speedUpPercentage = 1.8;
    }
}
