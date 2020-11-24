export default class Renderer {
    constructor() {
        this.queue = [];
    }

    add(entity) {
        this.queue.push(entity);
    }

    render(ctx) {
        const toTerminate = [];
        this.queue.forEach((entity, idx) => {
            console.log(entity)
            if (!entity.render(ctx)) {
                console.log('to be deleted renderer', entity)
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