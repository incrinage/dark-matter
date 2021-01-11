import KeyEventQueue from "./KeyEventQueue";

export default class KeyListener {

    constructor(keys) {
        this.keyEventQueue = new KeyEventQueue(keys);
        window.addEventListener('keydown', this.keyEventQueue.queueKeyEvent);
        window.addEventListener('keyup', this.keyEventQueue.queueKeyEvent);
    }

    flushQueue() {
        return this.keyEventQueue.flushQueue();
    }


    deque() {
        return this.keyEventQueue.deque();
    }

}