import { RpgGui, RpgSprite, RpgSpriteHooks } from '@rpgjs/client'

const sprite: RpgSpriteHooks = {
    onInit(sprite: RpgSprite) {
        if (sprite.data.name === 'SimpleBlacksmith') {
            sprite.eventMode = 'static';
            sprite.on('rightclick', () => {
                RpgGui.display('item-upgrade-gui');
            });
        }
    },
}

export default sprite;
