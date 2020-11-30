import Entity from "./Entity";

export default class SpaceShip extends Entity {
    constructor(props) {
        super(props);
        this.weapon = props.weapon;
    }

    fireWeapon() {
        return this.weapon.fire(this.getX()+ this.getHeight(), this.getY(), this.getTheta());
    }

    dt = 0;
    update(t) {
        return super.update(t);
    }

    setHealth(health){
        this.health = health < 0 ? 0 : health;
    }

    brake() {
        if (this.velocity.x < 0 && this.velocity.y < 0) {
            this.velocity.x = 0;
            this.velocity.y = 0;
        }
    }

}