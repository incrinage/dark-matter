import { L, M, S, X3S, XL, XS, XXS } from "./AstroidRadius";
import { canvas } from "./..";
import AsteroidFactory from "./AsteroidFactory";


export default class AsteroidSpawner {
    constructor() {
        this.asteroidFactory = new AsteroidFactory();
        this.queue = [];
    }

    dt = 0;
    asteroidSizes = [X3S, XXS, XS, S, M, L, XL];

    queueAsteroidInterval(currTime, milliSeconds, asteroidRadius) {
        if (currTime - this.dt >= milliSeconds) {
            const side = Math.floor(Math.random() * 4);
            const { pos, theta } = this.getOffScreenOrientation(side, asteroidRadius);
            const a = this.createAsteroid(asteroidRadius, pos, theta);

            this.dt = currTime;
            this.queue.push(a);
        }
    }

    createAsteroid(asteroidRadius, pos, theta) {
        return this.asteroidFactory.create(asteroidRadius,
            {
                velocity: { x: Math.random(), y: Math.random(), theta: (Math.random() * .05 - .05 * Math.random()) },
                pos,
                theta
            });
    }


    deque() {
        return this.queue.shift();
    }

    getOffScreenOrientation(side, offset) {
        const left = 0;
        const bottom = 1;
        const right = 2;
        const top = 3;
        switch (side) {
            case left:
                return { pos: { x: canvas.getWidth() + offset, y: canvas.getHeight() / 2 }, theta: 180 };
            case bottom:
                return { pos: { x: canvas.getWidth() / 2, y: canvas.getHeight() + offset }, theta: 270 };
            case right:
                return { pos: { x: -offset, y: canvas.getHeight() / 2 }, theta: 0 };
            case top:
                return { pos: { x: canvas.getWidth() / 2, y: -offset }, theta: 90 };
        }
    }
}