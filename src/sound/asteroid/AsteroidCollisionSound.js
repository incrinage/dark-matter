import AsteroidCollision from './rock-hits-rock.mp3';

export default class AsteroidCollisionSound {

    constructor() {
        this.file = AsteroidCollision;
        this.volume = 1;
    }

    play() {
        const audio = new Audio(this.file);
        audio.volume = this.volume;
        audio.play();
    }

    setVolume(v) {
        this.volume = v;
    }
}