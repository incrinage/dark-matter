
import LaserWeaponSound from './LaserWeaponSound';
import SpaceShipThrusterSound from './SpaceShipThrusterSound';

export default class SpaceShipSoundCollection {

    constructor() {
        this.weaponSound = new LaserWeaponSound()
        this.accelerationSound = new SpaceShipThrusterSound();
    }

    createThrusterSound(ctx) {
        return this.accelerationSound.createSound(ctx);
    }


    createLaserSound(ctx) {
        return this.weaponSound.createSound(ctx);
    }
}