import { RpgPlayer, ShapePositioning, inject } from "@rpgjs/server";
import { Direction, HitBox, Position, PositionXY } from "@rpgjs/types";

export enum MovingHitboxPositioning {
    Forward = "forward",
    Center = "center"
}

export interface MovingHitboxOfPlayer {
    player: RpgPlayer,
    hitbox: HitboxWidthHeight
    positioning: MovingHitboxPositioning,
    offset?: PositionXY,
}

export interface MovingHitboxByPosition {
    hitbox: HitboxWidthHeight,
    position: PositionXY,
}

export interface HitboxWidthHeight extends Pick<HitBox, 'width' | 'height'> {
}

export class PositionByType {
    getForward(player: RpgPlayer, hitbox: HitboxWidthHeight, offset?: PositionXY): PositionXY | undefined {
        const direction = player.getDirection()

        const x = player.position.x
        const y = player.position.y
        const width = player.width
        const height = player.height

        return {
            [Direction.Down]: {
                x: x + ((width - hitbox.height) / 2),
                y: y + height,
            },
            [Direction.Up]: {
                x: x + ((width - hitbox.width) / 2),
                y: y - hitbox.width,
            },
            [Direction.Left]: {
                x: x - hitbox.width,
                y: y + ((height - hitbox.height) / 2),
            },
            [Direction.Right]: {
                x: x + width,
                y: y + ((height - hitbox.height) / 2),
            },
        }[direction];
    }

    getCenterByPosition(position: PositionXY, hitbox: HitboxWidthHeight, offset?: PositionXY): PositionXY {
        return {
            x: position.x - (hitbox.width / 2) + (offset?.x || 0),
            y: position.y - (hitbox.height / 2) + (offset?.y || 0),
        }
    }

    getCenterOfPlayer(player: RpgPlayer, hitbox: HitboxWidthHeight, offset?: PositionXY): PositionXY {
        const x = player.position.x
        const y = player.position.y

        return {
            x: x + ((player.width - hitbox.width) / 2) + (offset?.x || 0),
            y: y + ((player.height - hitbox.height) / 2) + (offset?.y || 0),
        }
    }
}

export class MovingHitboxFactory {
    byPosition({ hitbox, position }: MovingHitboxByPosition) {
        const positionByType = inject(PositionByType);

        const newPosition = positionByType.getCenterByPosition(position, hitbox);

        return {
            width: hitbox.width,
            height: hitbox.height,
            x: newPosition?.x || 0,
            y: newPosition?.y || 0,
        }
    }

    ofPlayer({ player, hitbox, positioning, offset }: MovingHitboxOfPlayer): Pick<HitBox, 'width' | 'height' | 'x' | 'y'> {
        const positionByType = inject(PositionByType);

        const position = {
            [MovingHitboxPositioning.Forward]: positionByType.getForward(player, hitbox, offset),
            [MovingHitboxPositioning.Center]: positionByType.getCenterOfPlayer(player, hitbox, offset),
        }[positioning];

        return {
            width: this.getWidth(player, hitbox),
            height: this.getHeight(player, hitbox),
            x: position?.x || 0,
            y: position?.y || 0,
        }
    }

    private getWidth(player: RpgPlayer, hitbox: HitboxWidthHeight) {
        if ([Direction.Up, Direction.Down].includes(player.direction)) {
            return hitbox.height;
        }

        return hitbox.width;
    }

    private getHeight(player: RpgPlayer, hitbox: HitboxWidthHeight) {
        if ([Direction.Up, Direction.Down].includes(player.direction)) {
            return hitbox.width;
        }

        return hitbox.height;
    }

    private getPositionX(
        player: RpgPlayer,
        hitbox: HitboxWidthHeight,
        positioning: MovingHitboxPositioning,
        offset?: PositionXY
    ): number {
        const direction = player.getDirection()

        const x = player.position.x
        var width = player.width

        switch (direction) {
            case Direction.Left:
                return x - hitbox.width; // width is height in this case
            case Direction.Right:
                return x + width;
            default:
                return x + ((player.width - hitbox.height) / 2); // hitbox.height is width in this case
        }
    }

    private getPositionY(
        player: RpgPlayer,
        hitbox: HitboxWidthHeight,
        positioning: MovingHitboxPositioning,
        offset?: PositionXY
    ) {
        const direction = player.getDirection()

        const y = player.position.y
        const height = player.height

        switch (direction) {
            case Direction.Up:
                return y - hitbox.width; // width is height in this case
            case Direction.Down:
                return y + height;
            default:
                return y + ((player.height - hitbox.height) / 2);
        }
    }
}
