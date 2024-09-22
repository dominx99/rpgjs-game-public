import { RpgClient, RpgModule } from '@rpgjs/client'
import { sprite } from './sprite'
import { sceneMap } from './map'

/** @ts-ignore */
@RpgModule<RpgClient>({
    sprite,
    scenes: {
        map: sceneMap
    },
})
export default class RpgClientEngine { }
