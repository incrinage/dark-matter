import MeltingRockSound from './bullet-hit-rock.mp3';

export default class BulletHitRockSound {
    constructor() {
        this.file = MeltingRockSound;
    }

    play() {
        new Audio(this.file).play();
    }
}