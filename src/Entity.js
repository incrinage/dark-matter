

export default class Entity {
    dt = 0;
    constructor({ pos, velocity, theta }) {
        this.pos = pos;
        this.velocity = velocity || { x: 0, y: 0, theta: 0 };
        this.theta = theta || 0;
        this.width = 20;
        this.height = 20;
    }

    render(ctx) {
        ctx.strokeStyle = 'blue';
        ctx.save();
        ctx.translate(this.pos.x + (this.width / 2), this.pos.y + (this.height / 2))
        ctx.rotate(this.theta * Math.PI / 180);
        ctx.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
        ctx.restore();
        return true;
    }

    setX(x) {
        this.pos.x = x;
    }

    getX() {
        return this.pos.x;
    }

    getY() {
        return this.pos.y;
    }

    setVelocity(velocity) {
        this.velocity = velocity;
    }

    setY(y) {
        this.pos.y = y;
    }

    setWidth(w) {
        this.width = w;
    }

    setHeight(h) {
        this.height = h;
    }

    updatePosition() {
        this.pos.x += this.velocity.x * Math.cos(this.theta * Math.PI / 180);
        this.pos.y += this.velocity.y * Math.sin(this.theta * Math.PI / 180);
        this.theta += this.velocity.theta;
    }

    setAngle(theta) {
        this.theta = theta;
    }

    rotate() {
        this.theta = (this.theta + this.velocity.theta) % 360;
    }

    accelerate(x, y, theta) {
        this.velocity.x += x;
        this.velocity.y += y;
        this.velocity.theta += theta || 0;
    }

    update(t) {
        this.updatePosition();
        return true;
    }
}