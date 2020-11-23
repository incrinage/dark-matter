import Entity from "./Entity";

export default class Bullet extends Entity {

    damage = 0
    constructor(damage) {
        super({ x: 10, y: 10 });
        super.setHeight(5);
        super.setWidth(5);
        this.damage = damage;
    }

    update(t){
        super.update(t);
    }


    collide() {
        const dmg = this.damage;
        this.damage = 0;
        return dmg;
    }

}