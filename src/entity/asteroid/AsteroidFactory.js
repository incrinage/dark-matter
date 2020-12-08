import Asteroid from "./Asteroid";
import { L, M, S, X3S, XL, XS, XXS } from "./AsteroidRadius";

export default class AsteroidFactory {

    constructor() {

    }

    create(asteroidRadius, props) {
        switch (asteroidRadius) {
            case XL:
                return new Asteroid({ ...props, radius: XL, health: XL, mass: XL });
            case L:
                return new Asteroid({ ...props, radius: L, health: L, mass: L });
            case M:
                return new Asteroid({ ...props, radius: M, health: M, mass: M });
            case S:
                return new Asteroid({ ...props, radius: S, health: S, mass: S });
            case XS:
                return new Asteroid({ ...props, radius: XS, health: XS, mass: XS });
            case XXS:
                return new Asteroid({ ...props, radius: XXS, health: XXS, mass: XXS });
            case X3S:
                return new Asteroid({ ...props, radius: X3S, health: X3S, mass: X3S });
            default:
                console.log('The given asteroid radius is not supported', asteroidRadius);
        }
    }
}