import Entity from "../Entity";
import BulletHitRockSound from '../../sound/asteroid/BulletHitRockSound.js';

export default class Bullet extends Entity {

    constructor(props) {
        super(props);
        super.setHeight(5);
        super.setWidth(5);
        this.collisionSound = new BulletHitRockSound();
        this.firedLocation = undefined;
    }

    update(t) {
        super.update(t)
        this.getBoundary().setX(this.getX());
        this.getBoundary().setY(this.getY());
        this.getBoundary().setTheta(this.getTheta());
    }

    render(ctx) {
        super.render(ctx);
        this.getBoundary().render(ctx);
    }

    exhaust() {
        const dmg = this.damage;
        this.damage = 0;
        return dmg;
    }

    setFiredLocation() {
        this.firedLocation = { x: this.pos.x, y: this.pos.y };
    }

    getFireLocation() {
        return this.firedLocation;
    }

    distanceFromFiredLocation() {
        if (this.firedLocation) {
            const x = (this.pos.x - this.firedLocation.x);
            const y = (this.pos.y - this.firedLocation.y);
            return Math.sqrt(x * x + y * y);
        }
        return 0;
    }

    getCollisionSound(ctx) {
        return this.collisionSound.createSound(ctx);
    }

    onUpdate() {
        const distance = this.distanceFromFiredLocation();
        const maxBulletDistance = 200;
        if (distance >= maxBulletDistance) {
            return true;
        }

        if (this.getHealth() <= this.getHealthThreshold()) {
            return true;
        }
        return false;
    }

}