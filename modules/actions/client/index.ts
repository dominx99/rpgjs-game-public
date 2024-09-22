import { RpgClient, RpgModule, RpgScene } from '@rpgjs/client'
import { Control, PositionXY } from '@rpgjs/types';

let mousePosition: PositionXY = { x: 0, y: 0 };

/** @ts-ignore */
@RpgModule<RpgClient>({
    scenes: {
        map: {
            onAfterLoading(scene: RpgScene) {
                scene.on('mousemove', (pos: any) => {
                    mousePosition = { x: pos.x, y: pos.y };
                })
            }
        }
    },
    engine: {
        onInput(engine: RpgClientEngine, inputs: any) {
            inputs.forEach((input: any) => {
                if (input.includes('key') || input === Control.Attack) {
                    engine.getScene().game.clientEngine.socket.emit('key.pressed', {
                        input,
                        mousePosition
                    });
                }
            });
        }
    }
})
export default class RpgClientEngine { }
