import { L, M, S, TINY, XL, XS, XXS } from "./AsteroidSize";
import { canvas } from "./..";
import AsteroidFactory from "./AsteroidFactory";


export default class AsteroidSpawner {
    constructor() {
        this.asteroidFactory = new AsteroidFactory();
    }

    dt = 0;
    side = 0;
    asteroidSizes = [TINY, XXS, XS, S, M, L, XL];
    direction = [0, 90, 180, 270];
    spawnAsteroidEverySecond(t) {
        if (t - this.dt >= 1000) {
            const side = Math.floor(Math.random() * 4);
            const { pos, theta } = this.getOffScreenOrientation(side, XL);
            const a = this.asteroidFactory.create(XL,
                {
                    velocity: { x: 1, y: 1 },
                    pos,
                    theta
                });

            this.dt = t;
            return a;
        }
        return undefined;
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
        this.spawnAsteroidEverySecond(t);
    }
}