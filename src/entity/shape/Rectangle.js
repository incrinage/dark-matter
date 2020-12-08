export default class Rectangle {

    constructor({ x, y, width, height , theta}) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.theta = theta;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x;
    }

    setY(y) {
        this.y = y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setHeight(h) {
        this.height = h;
    }

    setWidth(w) {
        this.width = w;
    }

    setTheta(theta){
        this.theta = theta;
    }
    intersect(rect) {
        if (!(this.getX() > rect.getX() + rect.getWidth() ||
            this.getX() + this.getWidth() < rect.getX() ||
            this.getY() > rect.getY() + rect.getHeight() ||
            this.getY() + this.getHeight() < rect.getY())) {
            return true;
        }

        return false;
    }

    render(ctx){
        ctx.strokeStyle = "green";
        ctx.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }
}