import Sound from '../Sound';
import MeltingRockSound from './bullet-hit-rock.mp3';

export default class BulletHitRockSound {
    constructor() {
        this.file = MeltingRockSound;
    }

    createSound(ctx) {
        return new Sound(ctx, MeltingRockSound);
    }
}