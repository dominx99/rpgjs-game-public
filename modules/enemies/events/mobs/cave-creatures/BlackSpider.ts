import { EventData, Presets } from '@rpgjs/server';
import { KillableMob } from '../../../../../src/enemies/mobs/KillableMob';
import Drop from '../../../../inventory-extension/src/interfaces/Drop';
import SteelPlate from '../../../../items/database-random/armors/plate/SteelPlate';
import BigSword from '../../../../items/database-random/weapons/swords/BigSword';
import CircleShield from '../../../../items/database-random/armors/shields/CircleShield';
import Potion from '../../../../items/database/consumables/Potion';
import { PhysicalAttack } from '../../../../../src/enemies/attacks/PhysicalAttack';
import WoodenBow from '../../../../items/database-random/weapons/bows/WoodenBow';

@EventData({
    name: 'Black spider',
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class BlackSpider extends KillableMob {
    expToGainAfterKill: number = 150;
    goldToGainRange: [number, number] = [1, 3];
    attackSpeed: number = 1;

    getItemsToDrop(): Drop[] {
        return [
            {
                probability: 400,
                item: SteelPlate,
            },
            {
                probability: 600,
                item: BigSword,
            },
            {
                probability: 800,
                item: WoodenBow,
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
        super.onInit({
            maxHp: 1000,
        });
        this.level = 5;

        this.width = 110;
        this.height = 110;
        this.previewCustomParams = {
            marginTop: -20,
            scale: 1,
        }
        this.setGraphic(['spider-black', 'mob-vaporization-white-1']);
        this.graphics = {
            base: ['spider-black'],
        }

        this.paramsModifier = {
            [Presets.ATK]: {
                value: 15
            },
            [Presets.PDEF]: {
                value: 10
            },
            [Presets.SDEF]: {
                value: 10
            }
        }

        this.setPhysicalAttackInstance(new PhysicalAttack({
            graphics: ['spider-black'],
            animationName: 'attack'
        }));

        this.speed = 1.2;
        this.speedUpPercentage = 2;

        this.recovery({ hp: 1, sp: 1 });
    }
}
