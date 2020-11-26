import Entity from "./Entity";

export default class Asteroid extends Entity {

    constructor(props) {
        super({ ...props,  })
        this.radius = props.radius;
        this.health = props.health || 25;
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
        return this.health != 0;
    }

    update(t) {
        super.update(t);
        return this.health != 0;
    }

}