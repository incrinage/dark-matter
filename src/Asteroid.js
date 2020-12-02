import { L, M, S } from "./AstroidRadius";
import Entity from "./Entity";
let id = 0;
export default class Asteroid extends Entity {

    constructor(props) {
        super({ ...props, })
        this.id = id++;
        this.radius = props.radius || 5;
        this.width = props.radius * 2;
        this.height = props.radius * 2;
        this.isSplit = false;
        this.setMass(props.mass || props.radius);
        this.setHealth(this.radius);
        this.healthThreshold = props.healthThreshold || 0;
    }

    getX() {
        return this.pos.x - this.radius;
    }
    getY() {
        return this.pos.y - this.radius;
    }

    setHealth(health) {
        this.health = health < 0 ? 0 : health;
    }

    split() {
        if (!this.isSplit) {
            this.isSplit = !this.isSplit;
            if (this.radius > S) {
                return new Asteroid({ radius: 10, pos: { x: this.pos.x, y: this.pos.y }, velocity: { x: 1, y: 1, theta: 0 }, theta: this.theta, health: 10 })
            }
        }
        return undefined;
    }

    render(ctx) {
        ctx.font = "12px Arial";
        ctx.fillText(` =${this.health}`, this.pos.x, this.pos.y);
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    onRemove({add}){
        const asteroid = this.split();
        if(asteroid){
            add(asteroid, )
        }
    }

    update(t) {
        super.update(t);
    }
}
