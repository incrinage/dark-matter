import Entity from "./Entity";

export default class Bullet extends Entity {

    damage = 0

    constructor(damage) {
        super({ x: 10, y: 10 });
        super.setHeight(5);
        super.setWidth(5);
        this.damage = damage;
        this.travelDistance = 200;
        this.firedLocation = undefined;
    }

    update(t) {
        const u = super.update(t)
        if (this.firedLocation) {
            const x = (this.pos.x - this.firedLocation.x);
            const y = (this.pos.y - this.firedLocation.y);
            return !(this.travelDistance <= Math.sqrt(x * x + y * y));
        }
        return u;
    }


    render(ctx) {
        const r = super.render(ctx)
        if (this.firedLocation) {
            const x = (this.pos.x - this.firedLocation.x);
            const y = (this.pos.y - this.firedLocation.y);

            return !(this.travelDistance <= Math.sqrt(x * x + y * y));
        }
        return r;

    }


    use() {
        const dmg = this.damage;
        this.damage = 0;
        return dmg;
    }

    setFiredLocation() {
        this.firedLocation = { x: this.pos.x, y: this.pos.y };
    }

}