import Entity from "../Entity";
import MetalHitSound from '../../sound/spaceship/MetalHitSound.js';

export default class SpaceShip extends Entity {
    constructor(props) {
        super(props);
        this.collisionSound = new MetalHitSound();
        this.weapon = props.weapon;
        this.getAmmoRemaining = this.getAmmoRemaining.bind(this);
        this.onIntersect = this.onIntersect.bind(this);
    }

    fireWeapon() {
        const velocity = this.getVelocity();
        return this.weapon.fire(
            this.getX() + this.getWidth() * 1.5 * Math.cos(this.theta * Math.PI / 180),
            this.getY() + this.getHeight() * 1.5 * Math.sin(this.theta * Math.PI / 180),
            this.getTheta(),
            Math.abs(velocity.x),
            Math.abs(velocity.y)
        );
    }

    dt = 0;
    update(t) {
        this.getBoundary().setX(this.getX());
        this.getBoundary().setY(this.getY());
        return super.update(t);
    }

    getAmmoRemaining() {
        return this.weapon.getAmmoRemaining();
    }

    renderAmmo(ctx) {
        this.weapon.render(ctx);
    }

    reload(a) {
        this.weapon.reload(a);
    }

    setHealth(health) {
        this.health = health < 0 ? 0 : health;
    }

    brake() {
        if (this.velocity.x < 0 && this.velocity.y < 0) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

    onIntersect(otherObject) {
        this.collisionSound.play();
    }

}