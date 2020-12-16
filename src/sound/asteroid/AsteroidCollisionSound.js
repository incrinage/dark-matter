import AsteroidCollision from './rock-hits-rock.mp3';

export default class AsteroidCollisionSound {

    constructor() {
        this.file = AsteroidCollision;
    }

    play() {
        new Audio(this.file).play();
    }
}