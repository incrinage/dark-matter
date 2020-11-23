export default class Ammo {

    ammo = [];

    constructor(ammo){
        this.ammo = ammo;
    }

    deque(){
        return this.ammo.shift();
    }

}