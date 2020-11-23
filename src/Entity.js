

export default class Entity {
    dt = 0;
    constructor(pos) {
        this.pos = { x: pos.x, y: pos.y };
        this.velocity = { x: 0, y: 0 };
        this.acceleration = { x: 0, y: 0 };
        this.theta = 0;
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
    }

    setX(x){
        this.pos.x = x;
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
    }

    setAngle(theta) {
        this.theta = theta;
    }

    rotate(num) {
        this.theta = (this.theta + num) % 360;
    }

    accelerate(x, y) {
        // this.acceleration.x += x;
        this.velocity.x += x;
        // this.acceleration.y += y;
        this.velocity.y += y;
    }

    update(t) {
        this.updatePosition();
        return true;
    }
}