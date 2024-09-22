import { RpgServer, RpgModule } from '@rpgjs/server'
import player from './player';
import Freezing from './database/states/Freezing';

@RpgModule<RpgServer>({
    player: player,
    database: [
        Freezing
    ]
})
export default class RpgServerEngine { }
