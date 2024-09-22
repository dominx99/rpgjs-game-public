import { RpgSceneMapHooks, RpgSceneMap } from '@rpgjs/client'

const sceneMap: RpgSceneMapHooks = {
    onAfterLoading(scene: RpgSceneMap) {
        document.addEventListener('contextmenu', event => {
            event.preventDefault();
        });
    }
}

export default sceneMap;
