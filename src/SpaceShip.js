import Entity from "./Entity";

export default class SpaceShip extends Entity {
    constructor(props) {
        super(props);
    }

    //returns ammo dequed from weapon
    //add the projectile to the entities to render
    //the projectile will have angle and starting location and velocity
    fireWeapon(weapon){
        return weapon.fire(this.pos.x + this.height, this.pos.y, this.theta);
    }
}