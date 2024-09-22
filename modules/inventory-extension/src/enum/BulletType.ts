import ArrowBullet from "../../../heroes/events/bullets/ArrowBullet";

export enum BulletType {
    WOODEN_ARROW = 'WOODEN_ARROW',

}

export const Bullet = {
    map: {
        [BulletType.WOODEN_ARROW]: ArrowBullet,
    },

    get (type: BulletType) {
        return this.map[type];
    }
}
