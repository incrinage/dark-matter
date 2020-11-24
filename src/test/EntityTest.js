import { canvas } from "../..";
import { L, M, S, TINY, XL, XS, XXS } from "../AsteroidSize";
import { LEFT, RIGHT, SPACE_BAR, UP } from "../Key";
import Renderer from "../Renderer";
import UpdateService from "../UpdateService";


export default class EntityTest {
    constructor(entity, keyListener, weapon, asteroid, asteroidFactory) {
        this.entity = entity;
        this.keyListener = keyListener;
        this.weapon = weapon;
        this.asteroid = asteroid;
        this.renderer = new Renderer();
        this.renderer.add(entity);
        this.updateService = new UpdateService();
        this.updateService.add(entity);
        this.asteroidFactory = asteroidFactory;
    }


    dt = 0
    update(t) {
        const dir = this.keyListener.deque();
        this.inputManager(dir);
        this.decelerateEverySecond(t);
        this.spawnAsteroidsEverySecond(t);
        this.updateService.update(t);
    }

    asteroidDt = 0;
    side = 0;
    asteroidSizes = [TINY, XXS, XS, S, M, L, XL];
    direction = [0, 90, 180, 270];
    spawnAsteroidsEverySecond(t) {
        if (t - this.asteroidDt >= 1000) {
            const side = Math.floor(Math.random()*4);
            const a = this.asteroidFactory.create(XL, { velocity: { x: 1, y: 1 }, pos: {x: 100, y: 100} ,pos: this.getOffScreenPos(side, XL),  theta: this.getOffScreenAngle(side)});
            this.updateService.add(a);
            this.renderer.add(a);
            this.asteroidDt = t;
        }
    }


    //todo can this be generalized ?
    getOffScreenPos(side, offset) {
        switch (side) {
            case 0:
                return { x: canvas.getWidth() + offset, y: canvas.getHeight() / 2 };
            case 1:
                return { x: canvas.getWidth() / 2, y: canvas.getHeight() + offset };
            case 2:
                return { x: -offset, y: canvas.getHeight() / 2 };
            case 3:
                return { x: canvas.getWidth() / 2, y: -offset };
        }
    }

    getOffScreenAngle(side) {
        switch (side) {
            case 0:
                return 180;
            case 1:
                return 270
            case 2:
                return 0;
            case 3:
                return 90;
        }
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