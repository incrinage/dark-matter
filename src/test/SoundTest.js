import SpaceShip from '../sound/spaceship/song.mp3';

export default class SoundTest {

    constructor() {
        this.ctx = new AudioContext();
        this.audio = new Audio(SpaceShip);
        this.track = this.ctx.createMediaElementSource(this.audio);
        this.gainNode = this.ctx.createGain();
        this.track.connect(this.gainNode);
        this.mainGain = this.ctx.createGain();
        this.gainNode.connect(this.mainGain);
        this.mainGain.connect(this.ctx.destination);
        this.gainNode.connect(this.ctx.destination);

        this.pause = true;
        this.audio.loop = true;
    }

    play() {
        if (this.pause) {
            this.gainNode.gain.setTargetAtTime(.99, this.ctx.currentTime, .015);
            this.audio.play();
        } else {
            this.gainNode.gain.setTargetAtTime(0.001, this.ctx.currentTime, .015);
            setTimeout(() => {
                this.audio.pause();
            }, 50)
        }
        this.pause = !this.pause;
    }
}

let soundTest = new SoundTest();
document.getElementById("play-btn").onclick = () => {
    soundTest.play();
};