import Sound from '../Sound';
import AsteroidCollision from './mp3/rock-hits-rock.mp3';

export default class AsteroidCollisionSound {

    constructor() {
        this.file = AsteroidCollision;
    }

    createSound(ctx) {
        return new Sound(ctx, AsteroidCollision);
    }
}