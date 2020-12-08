import Ammo from "./Ammo";

export default class Weapon {

    firedTime = 0;

    constructor(ammo) {
        this.ammo = ammo || new Ammo();
        this.getAmmoRemaining = this.getAmmoRemaining.bind(this);

    }

    fire(x, y, theta, callerVx = 0, callerVy = 0) {
        const projectile = this.ammo.deque()
        if (projectile) {
            projectile.setX(x);
            projectile.setY(y);
            projectile.setAngle(theta);
            projectile.setVelocity({ x: 3+ callerVx, y: 3 + callerVy, theta: 0 });
            projectile.setFiredLocation();
            return projectile;
        }
        return undefined;
    }

    getAmmoRemaining() {
        return this.ammo.getAmmoRemaining();
    }

    reload(ammo) {
        this.ammo = ammo || new Ammo();
    }


    render(ctx) {
        this.ammo.render(ctx);
    }



}