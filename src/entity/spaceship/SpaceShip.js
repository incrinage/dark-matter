import Entity from "../Entity";
import MetalHitSound from '../../sound/spaceship/MetalHitSound.js';

export default class SpaceShip extends Entity {
    constructor(props) {
        super(props);
        this.collisionSound = new MetalHitSound();
        this.weapon = props.weapon;
        this.getAmmoRemaining = this.getAmmoRemaining.bind(this);
    }

    fireWeapon() {
        const velocity = this.getVelocity();
        return this.weapon.fire(
            this.getX() + this.getWidth() * Math.cos(this.theta * Math.PI / 180) + 7,//(this.getWidth()/4,
            this.getY() + this.getHeight() * Math.sin(this.theta * Math.PI / 180) + 7,
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

    render(ctx) {
        super.render(ctx);
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

    onUpdate() {
        if (this.getHealthPercentage() <= this.getHealthThreshold()) {
            this.spaceShip = undefined;
            return true;
        }

        return false;
    }

    getCollisionSound(ctx) {
        return this.collisionSound.createSound(ctx);
    }

    onRemove({ add }) {
        setTimeout(() => {
            //set health
            //set velocities to 0
            this.health = this.maxHealth;
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.velocity.theta = 0;
            add(this);
        }, 3000)
    }
}