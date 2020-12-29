import InputActionMap from "./InputActionMap";

export default class Engine {

    constructor(keyListener, audioCtx) {
        this.queue = [];
        //--
        //can wrap the filing input handlers into a class
        this.keyDownActionMap = new InputActionMap();
        this.keyUpActionMap = new InputActionMap();
        this.pressedKeys = {};
        this.keyListener = keyListener;
        //--
        this.audioCtx = audioCtx;

        this.add = this.add.bind(this);
    }

    getAudioContext() {
        return this.audioCtx;
    }

    addKeyDownAction(keyActionList) {
        keyActionList.forEach(({ key, action }) => {
            if (key && action) {
                this.keyDownActionMap.put(key, action);
            }
        })
    }

    addKeyUpAction(keyActionList) {
        keyActionList.forEach(({ key, action }) => {
            if (key && action) {
                this.keyUpActionMap.put(key, action);
            }
        })
    }

    /**
     * Tracks keys being held and release by
     * iterating overing an array of key events
     * which are provided to EventListeners waiting
     * for keyboard commands.
     * 
     * @param {} keyEvents 
     */

    updateHeldKeys(keyEvents) {
        if (!keyEvents) return;
        const removed = [];
        keyEvents.forEach(({ key, type }) => {
            if (type == "keydown") {
                this.pressedKeys[key] = true;
            } else if (type == "keyup") {
                removed.push(key);
                delete this.pressedKeys[key];
            }
        });
        return removed;
    }

    executeKeyDownActions(keys) {
        const callBackParams = { audioCtx: this.audioCtx };
        keys.forEach((key) => {
            this.keyDownActionMap.executeKeyActions(key, callBackParams);
        });
    }

    executeKeyUpActions(keys) {
        const callBackParams = { audioCtx: this.audioCtx };
        keys.forEach((key) => {
            this.keyUpActionMap.executeKeyActions(key, callBackParams);
        });
    }

    /**
    * Responsible for collisions by iterating through each entity
    * and checking if they intersect.
    *
    * Runtime O(n^2)
    * Memory O(n^2) 
    */
    intersect() {
        const collisionEvents = [];
        for (let i = 0; i < this.queue.length; i++) {
            for (let j = i; j < this.queue.length; j++) {

                if (i != j) {
                    const e1 = this.queue[i].entity;
                    const e2 = this.queue[j].entity;
                    if (e1.intersect(e2)) {
                        console.debug(' Intersection ', e1, e2);
                        collisionEvents.push({ e1, e2, });
                    }
                }
            }
        }
        return collisionEvents;
    }


    add(entity) {
        this.queue.push({ entity });
    }

    /**
     * Takes an array of object pairs {e1, e2} which have collided
     * and applies physics such as forces, change in velocities, 
     * and change in direction
     * @param [{e1:{},e2:{}}...] collisions 
     */
    applyCollisionPhysics(collisions) {
        if (!collisions) return;

        collisions.forEach(({ e1, e2 }) => {
            const e1Force = e1.getMass() * 1;
            const e2Force = e2.getMass() * 1;
            e1.setHealth(e1.getHealth() - e2Force); //doubles forces since objects are compared twice
            e2.setHealth(e2.getHealth() - e1Force);
        });
    }

    /**
     * Update all entities that have been added to this engine. 
     * 
     * Each entity is associated with a update condition provided when added. 
     * The condition checks if the entity wants to continue being updated & rendered.
     * 
     * Any entity that fails their update condition is then removed from the engine.
     * 
     * Upon removal, entities onRemove function will be called.
     * The function is an action the entity wants performed upon removal from the engine and despawned. 
     * 
     * For instances, asteroids in Dark Matter can become smaller objects if they lose enough
     * health. The asteroid can be removed and the onRemove function would spawn it's smaller pieces
     * in the desire direction.
     * 
    */
    update(t) {
        const keyEvents = this.keyListener.flushQueue();
        const releasedKeys = this.updateHeldKeys(keyEvents);
        this.executeKeyDownActions(Object.keys(this.pressedKeys));
        this.executeKeyUpActions(releasedKeys);

        this.updateEntities(t);
        const entityIndicies = this.checkEntityUpdateCondition();
        const entitiesRemoved = this.remove(entityIndicies);
        this.onRemove(entitiesRemoved);

        const collisions = this.intersect();
        this.invokeCollisionInteractions(collisions, this.audioCtx);
        this.applyCollisionPhysics(collisions);
    }


    /**
     * Updates entities by calling their update function.
     */
    updateEntities(t) {
        this.queue.forEach(({ entity }) => {
            entity.update(t);
        });
    }

    /**
     * Checks whether entities want to be updated again.
     * Entities that do not want to be updated again will 
     * have their indicies returned.
     * 
     * @returns Array(int) entity indicies
     */
    checkEntityUpdateCondition() {
        const failedPredicateIndicies = [];
        this.queue.forEach(({ entity }, idx) => {
            if (entity.onUpdate ? entity.onUpdate({ add: this.add }) : false) {
                console.debug('updatePredicateFailed', entity)
                failedPredicateIndicies.push(idx);
            }
        });
        return failedPredicateIndicies;
    }

    /**
     * Calls all entities onRemove method 
     * 
     * @param {Array(int)} entitiesToRemove 
     */
    onRemove(entitiesToRemove) {
        entitiesToRemove.forEach(({ entity }) => {
            entity.onRemove({ add: this.add });
        })
    }

    /**
     * Removes entities based on their index from the engine. 
     * Entities are no longer updated or rendered essentially
     * despawning them.
     * 
     * 
     * @param {Array(int)} toRemoveIdices 
     */
    remove(toRemoveIdices) {
        const updatedQueue = [];
        const entitiesRemoved = [];
        this.queue.forEach((entity, idx) => {
            if (!toRemoveIdices.includes(idx)) {
                updatedQueue.push(entity);
            } else {
                entitiesRemoved.push(entity);
            }
        })
        this.queue = updatedQueue;
        return entitiesRemoved;
    }

    /**
     * Renders all entities by calling their render method.
     * 
     * @param {Canvas2DContext} ctx 
     */
    render(ctx) {
        this.queue.forEach(({ entity }) => {
            entity.render(ctx);
        });

    }

    /**
     * Invokes interactions on collisions based on
     * user define function (not implemented).
     * 
     * Example, a callback with how to handle sound on intersection
     * @param {*} collisions 
     */
    invokeCollisionInteractions(collisions, audioCtx) {
        this.invokeCollisionSound(collisions, audioCtx)
    }

    invokeCollisionSound(collisions, audioCtx) {
        collisions.forEach(({ e1, e2 }) => {
            if (this.audioCtx.state === 'suspended') {
                return;
            }
            //objects of the same type are assumed to sound the same
            //therefore one object play button is called 
            //playing two tracks can sound out of sync
            const e1Sound = e1.getCollisionSound(audioCtx);
            e1Sound.connect(audioCtx.destination);

            const e2Sound = e2.getCollisionSound(audioCtx);
            e2Sound.connect(audioCtx.destination);

            if (e1.getClass().name === e2.getClass().name) {
                e1Sound.play();
            } else if (e1.getMass() / e2.getMass() >= 1) {  //play the sound of the smaller object
                e2Sound.play();
            } else {
                e1Sound.play();
                e2Sound.play();
            }
        })
    }

}