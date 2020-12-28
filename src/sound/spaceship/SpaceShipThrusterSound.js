import Sound from '../Sound';
import ThrusterSound from './mp3/space-ship-thrusters-1.mp3';

export default class SpaceShipThrusterSound {

    constructor() {
    }

    createSound(ctx) {
        return new Sound(ctx, ThrusterSound);
    }
}