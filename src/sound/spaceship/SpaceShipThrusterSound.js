import Sound from '../Sound';
import ThrusterSound from '../spaceship/mp3/space-ship-thrusters.mp3';

export default class SpaceShipThrusterSound {

    constructor() {
    }

    createSound(ctx) {
        return new Sound(ctx, ThrusterSound);
    }
}