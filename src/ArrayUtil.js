export default function sliceIndicies(toRemoveIndices) {
    toRemoveIndices.forEach((idx) => {
        this.queue = this.queue
            .slice(0, idx)
            .concat(this.queue.slice(idx + 1));
    });
}