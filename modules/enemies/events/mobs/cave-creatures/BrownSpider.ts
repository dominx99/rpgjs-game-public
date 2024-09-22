import { EventData, Presets } from '@rpgjs/server';
import { KillableMob } from '../../../../../src/enemies/mobs/KillableMob';
import Drop from '../../../../inventory-extension/src/interfaces/Drop';
import SteelPlate from '../../../../items/database-random/armors/plate/SteelPlate';
import BigSword from '../../../../items/database-random/weapons/swords/BigSword';
import CircleShield from '../../../../items/database-random/armors/shields/CircleShield';
import Potion from '../../../../items/database/consumables/Potion';
import { PhysicalAttack } from '../../../../../src/enemies/attacks/PhysicalAttack';

@EventData({
    name: 'Brown spider',
    hitbox: {
        width: 32,
        height: 32
    }
})
export default class BrownSpider extends KillableMob {
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
        super.onInit({
            maxHp: 500,
        });

        this.width = 110;
        this.height = 110;
        this.previewCustomParams = {
            marginTop: -20,
            scale: 1,
        }
        this.setGraphic(['spider-brown', 'mob-vaporization-white-1']);
        this.graphics = {
            base: ['spider-brown'],
        }

        this.paramsModifier = {
            [Presets.ATK]: {
                value: 7
            },
            [Presets.PDEF]: {
                value: 10
            },
            [Presets.SDEF]: {
                value: 10
            }
        }

        this.setPhysicalAttackInstance(new PhysicalAttack({
            graphics: ['spider-brown'],
            animationName: 'attack'
        }));

        this.speed = 1.2;
        this.speedUpPercentage = 2;
    }
}
