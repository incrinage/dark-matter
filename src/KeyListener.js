export default class KeyListener {

    queue = [];
    constructor(keys) {
        this.keys = keys;
        window.addEventListener('keydown', (e) => {
            if (this.keys.includes(e.key)) {
                e.preventDefault();
                this.queue.push(e.key);
            }
        });
    }

    deque() {
        return this.queue.shift();
    }

}