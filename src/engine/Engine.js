import InputActionMap from "./InputActionMap";

export default class Engine {

    constructor() {

        this.queue = [];
        this.inputActionMap = new InputActionMap();
        this.pressedKeys = {};
        this.add = this.add.bind(this);
    }

    addKeyAction(key, action) {
        this.inputActionMap.put(key, action);
    }

    proccessInput(keyEvents) {
        if (!keyEvents) return;
        keyEvents.forEach(({ key, type }) => {
            if (type == "keydown") {
                this.pressedKeys[key] = true;
            } else if (type == "keyup") {
                delete this.pressedKeys[key];
            }
        });

        for (const key in this.pressedKeys) {
            if (this.pressedKeys[key]) {
                this.inputActionMap.executeKeyActions(key);
            }
        }
    }

    intersect() {
        const collisionEvents = [];

        for (let i = 0; i < this.queue.length; i++) {
            for (let j = i; j < this.queue.length; j++) {

                if (i != j) {
                    const e1 = this.queue[i].entity;
                    const e2 = this.queue[j].entity;
                    if (e1.intersect(e2)) {
                        console.log('intersect', e1, e2);
                        collisionEvents.push({ e1, e2 });
                    }
                }
            }
        }

        return collisionEvents;
    }

    add(entity, updatePredicate) {
        this.queue.push({ entity, updatePredicate });
    }

    applyCollisionPhysics(collisions) {
        if (!collisions) return;

        collisions.forEach(({ e1, e2 }) => {
            //determine object direction
            //collision.entity1
            //collision.entity2
            //angle of incidence 
            const e1Force = e1.getMass() * 1;
            const e2Force = e2.getMass() * 1;
            e1.setHealth(e1.getHealth() - e2Force); //half forces since objects are compared twice
            e2.setHealth(e2.getHealth() - e1Force);
        });
    }

    update(t) {
        const failedPredicateIndicies = this.updateAndEvaluateUpdateCondition(t);
        const entitiesToRemove = this.remove(failedPredicateIndicies);
        this.onRemove(entitiesToRemove); 
    }

    updateAndEvaluateUpdateCondition(t) {
        const failedPredicateIndicies = [];
        this.queue.forEach(({ entity, updatePredicate }, idx) => {
            entity.update(t);
            if (updatePredicate ? updatePredicate() : false) {
                console.log('updatePredicateFailed', entity)
                failedPredicateIndicies.push(idx);
            }
        });
        return failedPredicateIndicies;
    }

    onRemove(entitiesToRemove) {
        entitiesToRemove.forEach(({entity}) => {
            entity.onRemove({ add: this.add });
        })
    }

    remove(toRemoveIdices) {
        const updatedQueue = [];
        const entitiesToRemove = [];
        this.queue.forEach((entity, idx) => {
            if (!toRemoveIdices.includes(idx)) {
                updatedQueue.push(entity);
            } else {
                entitiesToRemove.push(entity);
            }
        })
        this.queue = updatedQueue;
        return entitiesToRemove;
    }

    render(ctx) {
        this.queue.forEach(({ entity }, idx) => {
            entity.render(ctx);
        });

    }
}