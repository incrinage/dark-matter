
export default class Sound {

    constructor(ctx, path) {
        this.ctx = ctx;
        this.audio = new Audio(path);
        this.source = this.ctx.createMediaElementSource(this.audio);
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
        this.source.connect(this.gainNode);
    }

    getSource() {
        return this.source;
    }

    play() {
        if (!this.isPlaying()) {
            this.gainNode.gain.setTargetAtTime(1, this.ctx.currentTime, .9);
            setTimeout(() => {
                this.audio.play();
            }, 50);
        }
    }

    isPlaying() {
        return !this.audio.paused;
    }

    pause() {
        this.gainNode.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.015);
        setTimeout(() => {
            this.audio.pause();
        }, 100);
    }

    connect(node) {
        this.gainNode.connect(node);
    }
}
