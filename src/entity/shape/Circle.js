export default class Circle {
    constructor(props) {
        const { x, y, radius } = props;
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    intersect(otherCircle) {
        const dx = this.getX() - otherCircle.getX();
        const dy = this.getY() - otherCircle.getY();
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= this.getRadius() + otherCircle.getRadius()) {
            return true;
        }

        return false;
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getRadius() {
        return this.radius;
    }

    setX(x){
        this.x = x;
    }

    setY(y){
        this.y = y;
    }

    setRadius(radius){
        this.radius = radius;
    }
}