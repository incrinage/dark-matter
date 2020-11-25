import Entity from "./Entity";

export default class SpaceShip extends Entity {
    constructor(props) {
        super(props);
        this.weapon = props.weapon;
    }

    fireWeapon(){
        return this.weapon.fire(this.pos.x + this.height, this.pos.y, this.theta);
    }
    
    dt = 0;
    update(t){
        this.decelerateEverySecond(t);
        return super.update(t);
    }

    decelerateEverySecond(t) {
        if (t - this.dt >= 1000) {
            if (this.velocity.x > 0 && this.velocity.y > 0) {
                this.accelerate(-.1, -.1);
            }
            if (this.velocity.x < 0 && this.velocity.y < 0) {
                this.velocity.x = 0;
                this.velocity.y = 0;
            }
            this.dt = t;
        }
    }
}