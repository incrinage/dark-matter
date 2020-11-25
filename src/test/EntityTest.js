import AsteroidSpawner from "../AsteroidSpawner";
import Engine from "../Engine";
import { LEFT, RIGHT, SPACE_BAR, UP } from "../Key";


export default class EntityTest {
    constructor(spaceship, keyListener) {
        this.spaceShip = spaceship;
        this.keyListener = keyListener;
        this.asteroidSpawner = new AsteroidSpawner();
        this.engine = new Engine();
        this.engine.add(spaceship);
        this.engine.addKeyAction(LEFT, () => {
            this.spaceShip.rotate(-10);
        });
        this.engine.addKeyAction(RIGHT, () => {
            this.spaceShip.rotate(10);
        });
        this.engine.addKeyAction(UP, () => {
            this.spaceShip.accelerate(.1, .1);
        });
        this.engine.addKeyAction(SPACE_BAR, () => {
            const bullet = this.spaceShip.fireWeapon();
            if (bullet) {
                this.engine.add(bullet);
            };
        });
    }

    update(t) {
        const key = this.keyListener.deque();
        this.engine.proccessInput(key);
        this.registerSpawnedAsteroids(t);
        this.engine.update(t);
    }


    registerSpawnedAsteroids(t) {
        const asteroid = this.asteroidSpawner.spawnAsteroidEverySecond(t);
        if (asteroid) {
            this.engine.add(asteroid);
        }
    }

    render(ctx) {
        this.engine.render(ctx);
    }
}