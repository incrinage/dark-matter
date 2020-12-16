import ThrusterSound from './space-ship-thrusters-1.mp3';

export default class SpaceShipThrusterSound {

    constructor() {
        this.filePath = ThrusterSound;
        this.audio = new Audio(ThrusterSound);
    }

    play() {
        if (this.audio.ended) {
            this.audio = new Audio(this.filePath);
        }

        this.audio.play();
    }

    isPlaying() {
        return !this.audio.paused;
    }

    pause() {
        this.audio.pause();
    }
}