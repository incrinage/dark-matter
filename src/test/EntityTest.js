import { LEFT, RIGHT, SPACE_BAR, UP } from "../Key";


export default class EntityTest {
    constructor(entity, keyListener, weapon) {
        this.entity = entity;
        this.keyListener = keyListener;
        this.weapon = weapon;
        this.renderQueue = [entity];
        this.updateQueue = [entity];
    }


    dt = 0
    update(t) {
        const dir = this.keyListener.deque();
        this.inputManager(dir);
        this.decelerateEverySecond(t);
        this.updateQueue.forEach(entity => entity.update(t));
    }

    decelerateEverySecond(t) {
        if (t - this.dt >= 1000) {
            if (this.entity.velocity.x > 0 && this.entity.velocity.y > 0) {
                this.entity.accelerate(-.1, -.1);
            }
            if (this.entity.velocity.x < 0 && this.entity.velocity.y < 0) {
                this.entity.velocity.x = 0;
                this.entity.velocity.y = 0;

            }
            this.dt = t;

            console.log(this.entity);

        }
    }

    inputManager(dir) {
        if (dir == LEFT) {
            this.entity.rotate(-2);
        }
        if (dir == RIGHT) {
            this.entity.rotate(2);
        }
        if (dir == UP) {
            this.entity.accelerate(.1, .1);
        }

        if (dir == SPACE_BAR) {
            const bullet = this.entity.fireWeapon(this.weapon);
            if (bullet) {
                this.renderQueue.push(bullet);
                this.updateQueue.push(bullet);
            };
        }
    }

    render(ctx) {
        this.renderQueue.forEach(entity => entity.render(ctx));
    }
}