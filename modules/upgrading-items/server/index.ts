import { RpgServer, RpgModule } from '@rpgjs/server'
import player from './player';

/** @ts-ignore */
@RpgModule<RpgServer>({
    player
})
export default class RpgServerEngine { }
