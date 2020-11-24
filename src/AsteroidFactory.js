import Asteroid from "./Asteroid";
import { L, M, S, TINY, XL, XS, XXS } from "./AsteroidSize";

export default class AsteroidFactory {

    constructor() {

    }

    create(asteroidSize, props) {
        switch (asteroidSize) {
            case XL:
                return new Asteroid({ ...props, radius: 100 });
            case L:
                return new Asteroid({ ...props, radius: 80 });
            case M:
                return new Asteroid({ ...props, radius: 50 });
            case S:
                return new Asteroid({ ...props, radius: 35 });
            case XS:
                return new Asteroid({ ...props, radius: 25 });
            case XXS:
                return new Asteroid({ ...props, radius: 15 });
            case TINY:
                return new Asteroid({ ...props, radius: 10 });
        }
    }
}