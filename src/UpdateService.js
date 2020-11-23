export default class UpdateService {
    constructor() {
        this.queue = [];
    }

    add(entity) {
        this.queue.push(entity);
    }

    update(t) {
        const toTerminate = [];
        this.queue.forEach((entity, idx) => {
            if (!entity.update(t)) {
                console.log('to be deleted updateservice', entity)
                toTerminate.push(idx);
            }
        })

        toTerminate.forEach((idx) => {
            this.queue = this.queue
                .slice(0, idx)
                .concat(this.queue.slice(idx + 1));
        })
    }
}