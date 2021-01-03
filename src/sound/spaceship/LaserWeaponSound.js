import Sound from '../Sound';
import LaserShot1 from '../spaceship/mp3/laser-shot-1.mp3';
import Lasershot2 from '../spaceship/mp3/laser-shot-2.mp3';
import Lasershot3 from '../spaceship/mp3/laser-shot-3.mp3';

export default class LaserWeaponSound {

    constructor() {
        this.files = [LaserShot1, Lasershot2, Lasershot3];
        this.selected = 0;
    }

    createSound(ctx) {
        this.selected = this.selected++ % this.files.length;
        return new Sound(ctx, this.files[this.selected]);
    }
}