export default class CollisionObserver {
    constructor() {
        this.entityList = [];
    }

    add(entity) {
        this.entityList.push(entity);
    }

    getCollisions() {
        const collisionEvents = [];
       
        for (let i = 0; i < this.entityList.length; i++) {
            for (let j = 0; j < this.entityList.length; j++) {
               
                if (i != j) {
                    const e1 = this.entityList[i];
                    const e2 = this.entityList[j];
                    if (e1.intersect(e2)) {
                        console.log('intersect', e1, e2);
                        collisionEvents.push({ e1, e2 });
                    }
                }
            }
        }

        return collisionEvents;
    }

    remove(toRemoveIndices) {
        toRemoveIndices.forEach((idx) => {
            this.entityList = this.entityList
                .slice(0, idx)
                .concat(this.entityList.slice(idx + 1));
        });
    }
}