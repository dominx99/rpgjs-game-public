import { RpgSprite, RpgSpriteHooks } from '@rpgjs/client'
import { UnitInformationHooks } from '../../unit-information/server/src/hooks/UnitInformationHooks';

const sprite: RpgSpriteHooks = {
    onInit(sprite: RpgSprite) {
        if (!sprite.data || !sprite.data.canPreviewProfile) {
            return;
        }

        sprite.eventMode = 'static';
        sprite.on('rightclick', () => {
            sprite.getScene().game.clientEngine.socket.emit(UnitInformationHooks.SHOW, sprite.data.playerId);
        });
    },
}

export default sprite;
