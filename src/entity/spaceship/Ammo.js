export default class Ammo {

    projectiles = [];

    constructor(projectiles){
        this.projectiles = projectiles;
    }

    deque(){
        return this.projectiles.shift();
    }

}