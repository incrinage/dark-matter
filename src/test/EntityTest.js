import AsteroidSpawner from "../AsteroidSpawner";
import Engine from "../Engine";
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from "../Key";


export default class EntityTest {
    constructor(spaceship, keyListener) {
        this.spaceShip = spaceship;
        this.keyListener = keyListener;
        this.asteroidSpawner = new AsteroidSpawner();
        this.engine = new Engine();
        this.engine.add(spaceship);
        const angularVelocity = .005;
        this.engine.addKeyAction(LEFT, () => {
            this.spaceShip.accelerate(0, 0, -angularVelocity);
        });
        this.engine.addKeyAction(RIGHT, () => {
            this.spaceShip.accelerate(0, 0, angularVelocity);
        });
        const acceleration = .016;
        this.engine.addKeyAction(UP, () => {
            this.spaceShip.accelerate(acceleration, acceleration);
        });
        this.engine.addKeyAction(DOWN, () => {
            this.spaceShip.accelerate(-acceleration, -acceleration);
        });
        this.engine.addKeyAction(SPACE_BAR, () => {
            const bullet = this.spaceShip.fireWeapon();
            if (bullet) {
                this.engine.add(bullet);
            };
        });
    }

    update(t) {
        const keyEvents = this.keyListener.flushQueue();
        this.engine.proccessInput(keyEvents);
        this.asteroidSpawner.update(t);
        this.registerSpawnedAsteroids();
        this.engine.update(t);
    }


    registerSpawnedAsteroids() {
        const asteroid = this.asteroidSpawner.deque();
        if (asteroid) {
            this.engine.add(asteroid);
        }
    }

    render(ctx) {
        this.engine.render(ctx);
    }
}