import { S } from "./AsteroidRadius";
import Entity from "../Entity";
import { canvas } from '../../..';
import Circle from "../shape/Circle.js";
let id = 0;

function asteroidDespawnPredicate(asteroid) {
    return () => {

        //remove if outside canvas outter boundary
        if (asteroid.getX() < -canvas.getWidth() || asteroid.getX() > canvas.getWidth()
            || asteroid.getY() < -canvas.getHeight() || asteroid.getY() > canvas.getHeight()) {
            console.log("out of bounds", asteroid);
            return true;
        }
        //remove asteroid if health is below half
        if (asteroid.getHealthPercentage() <= asteroid.getHealthThreshold()) {
            console.log("no health", asteroid);
            return true;
        }
        return false;
    };
}
export default class Asteroid extends Entity {

    constructor(props) {
        super({ ...props, })
        this.id = id++;
        this.radius = props.radius || 5;
        this.setWidth(this.getRadius() * 2);
        this.setHeight(this.getRadius() * 2)
        this.isSplit = false;
        this.setMass(props.mass || props.radius);
        this.setHealth(this.radius);
        this.healthThreshold = props.healthThreshold || 0;
        this.circleBoundary = new Circle({ x: this.getX(), y: this.getY(), radius: this.getRadius() });
        super.getBoundary().setWidth(this.getRadius()*2);
        super.getBoundary().setHeight(this.getRadius()*2);
    }

    getRadius() {
        return this.radius;
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

    getCircleBoundary() {
        return this.circleBoundary;
    }

    intersect(other) {
        if (other instanceof Asteroid) {
            return this.getCircleBoundary().intersect(other.getCircleBoundary());
        }

        return super.intersect(other)
    }

    render(ctx) {
        this.getBoundary().render(ctx);
        ctx.strokeStyle = 'black';
        ctx.font = "12px Arial";
        ctx.fillText(` ${this.health}`, this.pos.x, this.pos.y);
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    onRemove({ add }) {
        const asteroid = this.split();
        if (asteroid) {
            add(asteroid, asteroidDespawnPredicate(asteroid));
        }
    }

    update(t) {
        super.update(t);
        this.updateBoundary();
    }

    updateBoundary() {
        this.circleBoundary.setX(this.getX());
        this.circleBoundary.setY(this.getY());
        this.circleBoundary.setRadius(this.getRadius());

        const boundary = super.getBoundary();
        boundary.setX(this.getX() - this.getRadius());
        boundary.setY(this.getY() - this.getRadius());
    }
}