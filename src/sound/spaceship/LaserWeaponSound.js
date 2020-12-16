import LaserShot1 from './laser-shot-1-C2.mp3';
import Lasershot2 from './laser-shot-2-Dflat2.mp3';
import Lasershot3 from './laser-shot-3-D2.mp3';

export default class LaserWeaponSound {

    constructor() {
        this.files = [LaserShot1, Lasershot2, Lasershot3];
        this.selected = 0;
    }

    play() {
        new Audio(this.files[this.selected]).play();
        this.selected = ++this.selected % this.files.length;
    }

}