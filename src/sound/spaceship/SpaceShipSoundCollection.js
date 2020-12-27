
import LaserWeaponSound from './LaserWeaponSound';
import SpaceShipThrusterSound from './SpaceShipThrusterSound';
import MetalHitSound from './MetalHitSound';

export default class SpaceShipSoundCollection {

    constructor() {
        this.weaponSound = new LaserWeaponSound()
        this.accelerationSound = new SpaceShipThrusterSound();
        this.damagedSound = new MetalHitSound();
    }

    createThrusterSound(ctx) {
        return this.accelerationSound.createSound(ctx);
    }

    createMetalHitSound(ctx) {
        return this.damagedSound.createSound(ctx)
    }

    createLaserSound(ctx) {
        return this.weaponSound.createSound(ctx);
    }
}