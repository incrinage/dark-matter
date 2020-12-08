import Rectangle from "./shape/Rectangle";

export default class Entity {
    dt = 0;
    constructor({ pos, velocity, theta, mass, health, healthThreshold, maxVelocity, maxAngularVelocity }) {
        this.pos = pos;
        this.velocity = velocity || { x: 0, y: 0, theta: 0 };
        this.theta = theta || 0;
        this.width = 20;
        this.height = 20;
        this.color = 'blue';
        this.mass = mass || 5;
        this.health = health || 5;
        this.maxHealth = health || 5;
        this.healthThreshold = healthThreshold || 0;
        this.onRemove = this.onRemove.bind(this);
        this.rectangle = new Rectangle({ x: this.pos.x, y: this.pos.y, width: this.getWidth(), height: this.getHeight(), theta: this.theta });
        this.maxVelocity = maxVelocity || { x: 1, y: 1, theta: 1 };
    }

    render(ctx) {
        ctx.strokeStyle = this.color;
        ctx.save();
        ctx.translate(this.getX() + (this.getWidth() / 2), this.getY() + (this.getHeight() / 2))
        ctx.rotate(this.getTheta() * Math.PI / 180);
        ctx.strokeRect(-(this.getWidth() / 2), -(this.getHeight() / 2), this.getWidth(), this.getHeight());
        ctx.restore();
    }

    getTheta() {
        return this.theta;
    }

    setMaxHealth(health) {
        this.maxHealth = health;
    }

    setX(x) {
        this.pos.x = x;
    }

    getMaxVelocity() {
        return this.maxVelocity;
    }

    setMaxVelocity(v) {
        this.maxVelocity = v;
    }

    getX() {
        return this.pos.x;
    }

    getY() {
        return this.pos.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getMass() {
        return this.mass;
    }

    getHealthPercentage() {
        return this.health / this.maxHealth;
    }

    getHealthThreshold() {
        return this.healthThreshold;
    }

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

    setMass(mass) {
        this.mass = mass;
    }
    getVelocity() {
        return { ...this.velocity };
    }

    setVelocity(velocity) {
        this.velocity = velocity;
    }

    setY(y) {
        this.pos.y = y;
    }

    setWidth(w) {
        this.width = w;
        this.rectangle.setWidth(w);
    }

    setHeight(h) {
        this.height = h;
        this.rectangle.setHeight(h);
    }

    updatePosition() {
        this.pos.x += this.velocity.x * Math.cos(this.theta * Math.PI / 180) * .9;
        this.pos.y += this.velocity.y * Math.sin(this.theta * Math.PI / 180) * .9;
        this.theta += this.velocity.theta;
    }

    setAngle(theta) {
        this.theta = theta;
    }

    rotate() {
        this.theta = (this.theta + this.velocity.theta) % 360;
    }

    intersect(otherEntity) {
        return this.getBoundary().intersect(otherEntity.getBoundary());
    }

    accelerate(x = 0, y = 0, theta = 0) {
        if (this.velocity.x > this.maxVelocity.x) {
            this.velocity.x = this.maxVelocity.x;
        }

        if (this.velocity.y > this.maxVelocity.y) {
            this.velocity.y = this.maxVelocity.y;
        }

        if (this.velocity.theta > this.maxVelocity.theta) {
            this.velocity.theta = this.maxVelocity.theta;
        }

        this.velocity.x += x;
        this.velocity.y += y;
        this.velocity.theta += theta;
    }

    onRemove({ add }) {

    }

    getBoundary() {
        return this.rectangle;
    }

    update(t) {
        this.updatePosition();

    }
}