import { L, M, S, TINY, XL, XS, XXS } from "./AsteroidSize";
import { canvas } from "./..";
import AsteroidFactory from "./AsteroidFactory";


export default class AsteroidSpawner {
    constructor() {
        this.asteroidFactory = new AsteroidFactory();
        this.queue = [];
    }

    dt = 0;
    side = 0;
    asteroidSizes = [TINY, XXS, XS, S, M, L, XL];

    queueAsteroidEverySecond(t) {
        if (t - this.dt >= 1000) {
            const side = Math.floor(Math.random() * 4);
            const { pos, theta } = this.getOffScreenOrientation(side, XL);
            const sign = Math.floor(Math.random());
            const a = this.asteroidFactory.create(XL,
                {
                    velocity: { x:  Math.random(), y: Math.random(), theta: (sign? .05 : -.05) },
                    pos,
                    theta
                });

            this.dt = t;
            this.queue.push(a);
        }
    }

    deque() {
        return this.queue.shift();
    }

    getOffScreenOrientation(side, offset) {
        switch (side) {
            case 0:
                return { pos: { x: canvas.getWidth() + offset, y: canvas.getHeight() / 2 }, theta: 180 };
            case 1:
                return { pos: { x: canvas.getWidth() / 2, y: canvas.getHeight() + offset }, theta: 270 };
            case 2:
                return { pos: { x: -offset, y: canvas.getHeight() / 2 }, theta: 0 };
            case 3:
                return { pos: { x: canvas.getWidth() / 2, y: -offset }, theta: 90 };
        }
    }


    update(t) {
        this.queueAsteroidEverySecond(t);
    }
}