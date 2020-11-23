export default class Weapon {

    firedTime = 0;

    constructor(ammo) {
        this.ammo = ammo;
    }

    fire(x, y, theta) {
        const projectile = this.ammo.deque()
        if (projectile) {
            projectile.pos.x = x;
            projectile.pos.y = y;
            projectile.velocity.x = 5;
            projectile.velocity.y = 5;
            projectile.theta = theta;
            projectile.firedTime = new Date().getTime();
        }
        return projectile;
    }


}