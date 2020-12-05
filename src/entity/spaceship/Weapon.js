export default class Weapon {

    firedTime = 0;

    constructor(ammo) {
        this.ammo = ammo;
    }

    fire(x, y, theta) {
        const projectile = this.ammo.deque()
        if (projectile) {
            projectile.setX(x);
            projectile.setY(y);
            projectile.setAngle(theta);
            projectile.setVelocity({ x: 1, y: 1, theta: 0 });
            projectile.setFiredLocation();
            return projectile;
        }
        return undefined;
    }


}