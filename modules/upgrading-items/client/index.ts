import { RpgClient, RpgModule } from '@rpgjs/client'
import sprite from './sprite';
import sceneMap from './scene-map';

/** @ts-ignore */
@RpgModule<RpgClient>({
    sprite: sprite,
    scenes: {
        map: sceneMap
    }
})
export default class RpgClientEngine { }
