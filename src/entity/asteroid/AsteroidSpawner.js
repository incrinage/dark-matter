import { L, M, SMALL, X3S, XL, XS, XXS } from "./AsteroidRadius";
import AsteroidFactory from "./AsteroidFactory";


export default class AsteroidSpawner {
    constructor(canvas) {
        this.asteroidFactory = new AsteroidFactory();
        this.canvas = canvas;
        this.queue = [];
        this.queueAsteroidInterval = this.queueAsteroidInterval.bind(this);
        this.createAsteroid = this.createAsteroid.bind(this);
    }

    dt = 0;
    asteroidSizes = [X3S, XXS, XS, SMALL, M, L, XL];
    canvasSide = 0;
    queueAsteroidInterval(currTime, milliSeconds, asteroidRadius) {
        if (currTime - this.dt >= milliSeconds) {
            const { pos, theta } = this.getOffScreenOrientation(this.canvasSide, asteroidRadius);
            this.canvasSide = (this.canvasSide + 1) % 4;
            const a = this.createAsteroid(asteroidRadius, pos, theta);

            this.dt = currTime;
            this.queue.push(a);
        }
    }

    createAsteroid(asteroidRadius, pos, theta) {
        return this.asteroidFactory.create(asteroidRadius,
            {
                velocity: { x: Math.random(), y: Math.random(), theta: (Math.random() * .50 - .50 * Math.random()) },
                pos,
                theta,
                canvas: this.canvas
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
            case right:
                return { pos: { x: this.canvas.getWidth() + offset, y: this.canvas.getHeight() / 2 }, theta: 180 };
            case bottom:
                return { pos: { x: this.canvas.getWidth() / 2, y: this.canvas.getHeight() + offset }, theta: 270 };
            case left:
                return { pos: { x: -offset, y: this.canvas.getHeight() / 2 }, theta: 0 };
            case top:
                return { pos: { x: this.canvas.getWidth() / 2, y: -offset }, theta: 90 };
        }
    }
}