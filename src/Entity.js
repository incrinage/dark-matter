

export default class Entity {
    dt = 0;
    constructor({ pos, velocity, theta, mass, health, healthThreshold }) {
        this.pos = pos;
        this.velocity = velocity || { x: 0, y: 0, theta: 0 };
        this.theta = theta || 0;
        this.width = 20;
        this.height = 20;
        this.color = 'blue';
        this.mass = mass || 5;
        this.health = health;
        this.maxHealth = health;
        this.healthThreshold = healthThreshold || 0;
    }

    render(ctx) {
        ctx.strokeStyle = this.color;
        ctx.save();
        ctx.translate(this.getX() + (this.getWidth() / 2), this.getY() + (this.getHeight() / 2))
        ctx.rotate(this.getTheta() * Math.PI / 180);
        ctx.strokeRect(-(this.getWidth() / 2), -(this.getHeight() / 2), this.getWidth(), this.getHeight());
        ctx.restore();
    }

    getTheta(){
        return this.theta;
    }

    setMaxHealth(health){
        this.maxHealth = health;
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

    intersect(otherEntity) {
        if (!(this.getX() > otherEntity.getX() + otherEntity.getWidth() ||
            this.getX() + this.getWidth() < otherEntity.getX() ||
            this.getY() > otherEntity.getY() + otherEntity.getHeight() ||
            this.getY() + this.getHeight() < otherEntity.getY())) {
            return true;
        }

        return false;
    }
    accelerate(x, y, theta) {
        this.velocity.x += x;
        this.velocity.y += y;
        this.velocity.theta += theta || 0;
    }

    update(t) {
        this.updatePosition();
    }
}