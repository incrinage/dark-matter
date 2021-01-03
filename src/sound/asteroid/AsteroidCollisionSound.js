import Sound from '../Sound';
import AsteroidCollision from '../asteroid/mp3/rock-hits-rocky.mp3';

export default class AsteroidCollisionSound {

    constructor() {
        this.file = AsteroidCollision;
    }

    createSound(ctx) {
        return new Sound(ctx, AsteroidCollision);
    }
}