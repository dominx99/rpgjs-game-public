import { RpgServer, RpgModule } from '@rpgjs/server'
import player from './player';

@RpgModule<RpgServer>({
    player: player
})
export default class RpgServerEngine { }
