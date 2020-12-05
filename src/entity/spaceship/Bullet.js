import Entity from "../Entity";

export default class Bullet extends Entity {

    constructor(props) {
        super(props);
        super.setHeight(5);
        super.setWidth(5);
        this.firedLocation = undefined;
    }

    update(t) {
        super.update(t)
    }

    render(ctx) {
        super.render(ctx);
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

}