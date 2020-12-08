export default class KeyEventQueue {

    queue = [];
    constructor(keys) {
        this.keys = keys;
        this.queueKeyEvent = this.queueKeyEvent.bind(this);
    }
    queueKeyEvent(e) {
        if (this.keys.includes(e.key)) {
            e.preventDefault();
            this.queue.push(e);
        }
    }

    flushQueue() {
        const q = [...this.queue];
        this.queue = [];
        return q;
    }

    deque() {
        return this.queue.shift();
    }
}