import Sound from '../Sound';
import MetalHit from './mp3/rock-hitting-spaceship.mp3';

export default class MetalHitSound {
    constructor() {
        this.file = MetalHit;
    }

    createSound(ctx) {
        return new Sound(ctx, MetalHit);
    }
}