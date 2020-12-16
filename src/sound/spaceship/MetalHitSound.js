import MetalHit from './rock-hitting-spaceship.mp3';

export default class MetalHitSound {
    constructor() {
        this.file = MetalHit;
    }


    play() {
        new Audio(this.file).play();
    }
}