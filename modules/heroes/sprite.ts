import { RpgSprite, RpgSpriteHooks } from '@rpgjs/client'
import { PositionXY } from '@rpgjs/types';

const rotate = function(currentPosition: PositionXY, targetPosition: PositionXY) {
    const deltaX = targetPosition.x - currentPosition.x;
    const deltaY = targetPosition.y - currentPosition.y;

    // Use Math.atan2 to calculate the angle in radians
    const radians = Math.atan2(deltaY, deltaX);

    // Convert radians to degrees
    const degrees = radians * (180 / Math.PI);

    // Ensure the angle is in the range [0, 360)
    const positiveDegrees = (degrees + 360) % 360;

    return positiveDegrees;
}

const sprite: RpgSpriteHooks = {
    onUpdate(sprite: RpgSprite, obj) {
        if (sprite.data.name && sprite.data.name.endsWith('bullet')) {
            if (
                !sprite.data.paramsChanged
                || !sprite.data.paramsChanged.position
                || !sprite.data.prevParamsChanged
                || !sprite.data.prevParamsChanged.paramsChanged
                || !sprite.data.prevParamsChanged.paramsChanged.position
            ) {
                return;
            }

            const currentPosition = sprite.data.paramsChanged?.position
            const nextPosition = sprite.data.prevParamsChanged?.paramsChanged?.position

            /* @TODO: Round sprite.angle and check if it's changed instead of input values */
            const angle = rotate(
                {
                    x: Math.round(currentPosition.x),
                    y: Math.round(currentPosition.y),
                },
                {
                    x: Math.round(nextPosition.x),
                    y: Math.round(nextPosition.y),
                }
            );

            sprite.angle = angle;
        }
    }
}

export default sprite
