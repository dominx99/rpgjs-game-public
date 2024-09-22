import { RpgSceneMapHooks, RpgGui } from '@rpgjs/client';

export const sceneMap: RpgSceneMapHooks = {
    onAfterLoading() {
        RpgGui.display('chat-gui');
    }
}
