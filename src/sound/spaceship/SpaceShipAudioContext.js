export default class SpaceShipAudioContext {

    constructor(ctx) {
        this.ctx = ctx || new AudioContext();
        this.gainNode = this.ctx.createGain();
        this.gainNode.connect(this.ctx.destination);
    }

    getMainGain() {
        return this.gainNode;
    }

    getContext() {
        return this.ctx;
    }

}