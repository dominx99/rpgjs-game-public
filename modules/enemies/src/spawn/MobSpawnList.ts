import { NPC } from '../../../../src/spawn/Spawner';
import BlackSpider from '../../events/mobs/cave-creatures/BlackSpider';
import BlueSpider from '../../events/mobs/cave-creatures/BlueSpider';
import BrownSpider from '../../events/mobs/cave-creatures/BrownSpider';
import GreenSpider from '../../events/mobs/cave-creatures/GreenSpider';
import PurpleSpider from '../../events/mobs/cave-creatures/PurpleSpider';
import RedSpider from '../../events/mobs/cave-creatures/RedSpider';
import DesertGolem from '../../events/mobs/DesertGolem';
import FlyingEye from '../../events/mobs/FlyingEye';
import PurpleMagician from '../../events/mobs/PurpleMagician';
import WhiteRabbitMob from '../../events/mobs/WhiteRabbitMobs';
import Zombie from '../../events/mobs/Zombie';

const MobSpawnList: NPC = {
    'White rabbit': {
        class: WhiteRabbitMob,
        hitbox: {
            width: 64,
            height: 64,
        }
    },
    'Flying eye': {
        class: FlyingEye,
        hitbox: {
            width: 32,
            height: 48,
        }
    },
    'Purple magician': {
        class: PurpleMagician,
        hitbox: {
            width: 32,
            height: 48,
        }
    },
    'Desert golem': {
        class: DesertGolem,
        hitbox: {
            width: 32,
            height: 48,
        }
    },
    'Zombie': {
        class: Zombie,
        hitbox: {
            width: 64,
            height: 64,
        }
    },
    'Black spider': {
        class: BlackSpider,
        hitbox: {
            width: 32,
            height: 32,
        }
    },
    'Brown spider': {
        class: BrownSpider,
        hitbox: {
            width: 32,
            height: 32,
        }
    },
    'Purple spider': {
        class: PurpleSpider,
        hitbox: {
            width: 32,
            height: 32,
        }
    },
    'Red spider': {
        class: RedSpider,
        hitbox: {
            width: 32,
            height: 32,
        }
    },
    'Green spider': {
        class: GreenSpider,
        hitbox: {
            width: 32,
            height: 32,
        }
    },
    'Blue spider': {
        class: BlueSpider,
        hitbox: {
            width: 32,
            height: 32,
        }
    }
}

export default MobSpawnList;
