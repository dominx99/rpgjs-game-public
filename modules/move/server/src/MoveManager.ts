import { Direction, RpgMap, RpgServerEngine } from '@rpgjs/server'
import { Vector2d, Vector2dZero } from "@rpgjs/common/lib/Vector2d";
import { Observable, Subject, mergeMap, takeUntil, map, tap, from } from 'rxjs'

export interface MoveManager {
    position: Vector2d,
    speed: number,
    changeDirection: (direction: Direction) => void;
    isCollided: (position: Vector2d) => boolean;
    stopMoveTo: () => void;
    destroyMove$: Subject<boolean>;
    _destroy$: Subject<void>;
    server: RpgServerEngine;
    changeDirectionByNextPosition(nextPosition: Vector2d): void;
    computeNextPosition(nextPosition: Vector2d, target: Vector2d): Promise<Vector2d>;
    movePlayerToPosition(targetPosition: Vector2d, options: MovePlayerToPositionOptions): Observable<Vector2d>;
    getCurrentMap(): RpgMap | null;
    hitbox: SAT.Box;
}

export interface MovePlayerToPositionOptions {
    onComplete: () => void;
    onOutBounds?: () => void;
}

export class MoveManager {
    changeDirectionByNextPosition(nextPosition: Vector2d): void {
        const { x, y } = this.position
        const { x: nx, y: ny } = nextPosition
        const diff = Math.abs(x - nx) > Math.abs(y - ny)
        if (diff) {
            if (nx > x) {
                this.changeDirection(Direction.Right)
            }
            else {
                this.changeDirection(Direction.Left)
            }
        }
        else {
            if (ny > y) {
                this.changeDirection(Direction.Down)
            }
            else {
                this.changeDirection(Direction.Up)
            }
        }
    }
    async computeNextPosition(nextPosition: Vector2d, target: Vector2d): Promise<Vector2d> {
        const pullDistance = target.distanceWith(nextPosition)
        if (pullDistance <= this.speed) {
            return nextPosition.set(target)
        }
        const pull = (target.copy().subtract(nextPosition)).multiply((1 / pullDistance))
        const totalPush = new Vector2dZero()
        let contenders = 0

        await this.isCollided(nextPosition);

        pull
            .multiply(Math.max(1, 4 * contenders))
            .add(totalPush)
            .normalize()

        return nextPosition.add(pull.multiply(this.speed))
    }

    isOutOfBound(position: Vector2d): boolean {
        const map = this.getCurrentMap();

        if (!map) {
            return true;
        }

        const xk = position.x < map?.widthPx ? -5 : 5;
        const yk = position.y < map?.heightPx ? -5 : 5;

        const x = position.x + (this.hitbox.w / 2) + xk;
        const y = position.y + (this.hitbox.h / 2) + yk;

        if (x <= 0 || x >= map.widthPx) {
            return true;
        }

        if (y <= 0 || y >= map.heightPx) {
            return true;
        }

        return false;
    }

    movePlayerToPosition(targetPosition: Vector2d, options: MovePlayerToPositionOptions): Observable<Vector2d> {
        const lastPositions: Vector2d[] = []
        let i = 0
        let count = 0
        this.stopMoveTo()
        this.destroyMove$ = new Subject()

        const { onComplete, onOutBounds } = options;

        /** @ts-ignore */
        return this.server.tick
            .pipe(
                /** @ts-ignore */
                takeUntil(this.destroyMove$),
                takeUntil(this._destroy$),
                mergeMap(() => from(this.computeNextPosition(this.position.copy(), targetPosition))),
                tap((position: Vector2d) => {
                    if (this.isOutOfBound(position)) {
                        onOutBounds?.();
                    }
                }),
                map(newPosition => {
                    return this.position.set(newPosition);
                }),
                tap((position: Vector2d) => {
                    lastPositions[i] = position.copy()
                    i++
                    count++
                    if (i >= 3) {
                        i = 0
                    }
                    else if (this.position.isEqual(targetPosition)) {
                        onComplete?.()
                    }
                    else {
                        count = 0
                    }
                })
            );
    }
}
