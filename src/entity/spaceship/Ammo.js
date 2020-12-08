import Bullet from "./Bullet";

export default class Ammo {

    projectiles = [];

    constructor(projectiles) {
        this.projectiles = projectiles ||
            [
                new Bullet({ pos: { x: 0, y: 0 } }),
                new Bullet({ pos: { x: 0, y: 0 } }),
                new Bullet({ pos: { x: 0, y: 0 } }),
                new Bullet({ pos: { x: 0, y: 0 } }),
                new Bullet({ pos: { x: 0, y: 0 } })
            ];
        this.getAmmoRemaining = this.getAmmoRemaining.bind(this);
        this.placementVector = [0, 0];
        this.size = 0;
        this.maxSize = 10;
    }

    deque() {
        if (this.size <= 0) {
            this.size--;
        }
        return this.projectiles.shift();
    }
    getAmmoRemaining() {
        return this.projectiles.length;
    }

    setPlacementVector(placementVector) {
        this.placementVector = placementVector;
    }

    queue(b) {
        if (this.size == this.maxSize) {
            return;
        }
        this.size++;
        this.projectiles.push(b);
    }

    render(ctx) {
        ctx.strokeStyle = "orange";
        let spacingWidth = 12;
        let spacing = spacingWidth;
        this.projectiles.forEach(() => {
            ctx.strokeRect(this.placementVector[0] + spacing, this.placementVector[1], 7 , 35);
            spacing += spacingWidth;
            // spacingWidth += 20;
        })
    }

}