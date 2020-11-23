import { LEFT, RIGHT, SPACE_BAR, UP } from "../Key";
import Renderer from "../Renderer";
import UpdateService from "../UpdateService";


export default class EntityTest {
    constructor(entity, keyListener, weapon) {
        this.entity = entity;
        this.keyListener = keyListener;
        this.weapon = weapon;
        this.renderer = new Renderer();
        this.renderer.add(entity);
        this.updateService = new UpdateService();
        this.updateService.add(entity);
    }


    dt = 0
    update(t) {
        const dir = this.keyListener.deque();
        this.inputManager(dir);
        this.decelerateEverySecond(t);
        this.updateService.update(t);
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
                this.updateService.add(bullet);
                this.renderer.add(bullet);
            };
        }
    }

    render(ctx) {
        this.renderer.render(ctx);
    }
}