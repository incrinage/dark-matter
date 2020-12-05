import { canvas } from "../..";
import { M, XL } from "../entity/asteroid/AsteroidRadius";
import AsteroidSpawner from "../entity/asteroid/AsteroidSpawner";
import Engine from "../engine/Engine";
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from "../Key";
import Asteroid from "../entity/asteroid/Asteroid";


export default class EntityTest {
    constructor(spaceship, keyListener) {
        this.spaceShip = spaceship;
        this.keyListener = keyListener;
        this.asteroidSpawner = new AsteroidSpawner();
        this.engine = new Engine();
        this.engine.add(spaceship, spaceShipDespawnPredicate(spaceship));
        // const a1 = new Asteroid({ radius: S, pos: { x: 400, y: 400 }, velocity: { x: 1, y: 1, theta: 0 }, theta: 90, health: S, mass: 100 })
        // const a2 = new Asteroid({ radius: S, pos: { x: 420, y: 420 }, velocity: { x: 1, y: 1, theta: 0 }, theta: -90, health: S })
        const a2 = new Asteroid({ radius: M, pos: { x: 400, y: 650 }, velocity: { x: 0, y: 0, theta: 0 }, theta: -90, health: M })

        // this.engine.add(a1, asteroidDespawnPredicate(a1));
        this.engine.add(a2, asteroidDespawnPredicate(a2));
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

        function bulletDespawnPredicate(bullet) {
            return () => {
                const distance = bullet.distanceFromFiredLocation();
                const maxBulletDistance = 200;
                if (distance >= maxBulletDistance) {
                    return true;
                }
                return false;

            };
        }
        this.engine.addKeyAction(SPACE_BAR, () => {
            const bullet = this.spaceShip.fireWeapon();
            if (bullet) {
                this.engine.add(bullet, bulletDespawnPredicate(bullet), bulletDespawnPredicate(bullet));
            };
        });
    }


    update(t) {
        const keyEvents = this.keyListener.flushQueue();
        this.engine.proccessInput(keyEvents);
        this.asteroidSpawner.queueAsteroidInterval(t, 500, XL);
        this.registerSpawnedAsteroids();
        this.engine.update(t);
        const collisions = this.engine.intersect();
        this.engine.applyCollisionPhysics(collisions);
    }


    registerSpawnedAsteroids() {
        const asteroid = this.asteroidSpawner.deque();
        if (asteroid) {
            this.engine.add(asteroid, asteroidDespawnPredicate(asteroid));
        }
    }

    render(ctx) {
        this.engine.render(ctx);
    }
}

function asteroidDespawnPredicate(asteroid) {
    return () => {

        //remove if outside canvas outter boundary
        if (asteroid.getX() < -canvas.getWidth() || asteroid.getX() > canvas.getWidth()
            || asteroid.getY() < -canvas.getHeight() || asteroid.getY() > canvas.getHeight()) {
            console.log("out of bounds", asteroid);
            return true;
        }
        //remove asteroid if health is below half
        if (asteroid.getHealthPercentage() <= asteroid.getHealthThreshold()) {
            console.log("no health", asteroid);
            return true;
        }
        return false;
    };
}

function spaceShipDespawnPredicate(spaceShip) {
    return () => {
        if (spaceShip.getHealthPercentage() <= spaceShip.getHealthThreshold()) {
            return true;
        }

        return false;
    }
}

