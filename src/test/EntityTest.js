import { M, XL } from "../entity/asteroid/AsteroidRadius";
import AsteroidSpawner from "../entity/asteroid/AsteroidSpawner";
import Engine from "../engine/Engine";
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from "../Key";
import LaserWeaponSound from "../sound/spaceship/LaserWeaponSound";
import SpaceShipThrusterSound from "../sound/spaceship/SpaceShipThrusterSound";
import MainMenuTheme from "../sound/menu/MainMenuTheme.js";


export default class EntityTest {
    constructor(spaceship, keyListener, canvas) {
        const c = document.getElementById('canvas');
        this.canvas = canvas;
        const mainMenuTheme = new MainMenuTheme();
        c.addEventListener('focusin', () => {
            console.log('foc9sojcs')
            mainMenuTheme.play();
        })

        this.spaceShip = spaceship;
        this.laserSound = new LaserWeaponSound();
        this.thrusterSound = new SpaceShipThrusterSound();
        this.keyListener = keyListener;
        this.asteroidSpawner = new AsteroidSpawner(this.canvas);
        this.engine = new Engine();
        this.engine.add(spaceship, this.spaceShipDespawnPredicate(spaceship));
        this.asteroidDespawnPredicate = this.asteroidDespawnPredicate.bind(this);
        // const a1 = new Asteroid({ radius: S, pos: { x: 400, y: 400 }, velocity: { x: 1, y: 1, theta: 0 }, theta: 90, health: S, mass: 100 })
        // const a2 = new Asteroid({ radius: S, pos: { x: 420, y: 420 }, velocity: { x: 1, y: 1, theta: 0 }, theta: -90, health: S })
        // const a2 = new Asteroid({ canvas: this.canvas, radius: M, pos: { x: 400, y: 650 }, velocity: { x: 0, y: 0, theta: 0 }, theta: -90, health: M })

        // this.engine.add(a1, asteroidDespawnPredicate(a1));
        // this.engine.add(a2, this.asteroidDespawnPredicate(a2));

        const angularVelocity = .030;
        this.engine.addKeyAction(LEFT, () => {
            if (this.spaceShip) this.spaceShip.accelerate(0, 0, -angularVelocity);
        });

        this.engine.addKeyAction(RIGHT, () => {
            if (this.spaceShip) this.spaceShip.accelerate(0, 0, angularVelocity);
        });

        const acceleration = .030;
        this.engine.addKeyAction(UP, () => {
            if (this.spaceShip) {
                this.thrusterSound.play();
                this.spaceShip.accelerate(acceleration, acceleration);
            }
        });
        this.engine.addKeyAction(DOWN, () => {
            if (this.spaceShip) this.spaceShip.accelerate(-acceleration, -acceleration);
        });

        function bulletDespawnPredicate(bullet) {
            return () => {
                const distance = bullet.distanceFromFiredLocation();
                const maxBulletDistance = 200;
                if (distance >= maxBulletDistance) {
                    return true;
                }

                if (bullet.getHealth() <= bullet.getHealthThreshold()) {
                    return true;
                }
                return false;

            };
        }

        window.addEventListener("keyup", (e) => {
            e.preventDefault();
            if (!this.spaceShip) return;

            if (e.key === UP) {
                this.thrusterSound.pause();
            }

            if (e.key === SPACE_BAR) {
                const bullet = this.spaceShip.fireWeapon();
                if (bullet) {
                    this.laserSound.play();
                    //shooting sound
                    this.engine.add(bullet, bulletDespawnPredicate(bullet));
                } else {
                    //clicking sound if empty
                    //reload sound when reloading
                    this.spaceShip.reload();
                };
            }
        })

    }

    asteroidDespawnPredicate(asteroid) {
        return () => {

            //remove if outside canvas outter boundary
            if (asteroid.getX() < -this.canvas.getWidth() || asteroid.getX() > this.canvas.getWidth()
                || asteroid.getY() < -this.canvas.getHeight() || asteroid.getY() > this.canvas.getHeight()) {
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

    update(t) {
        const keyEvents = this.keyListener.flushQueue();
        this.engine.proccessInput(keyEvents);
        this.asteroidSpawner.queueAsteroidInterval(t, 2000, XL);
        this.registerSpawnedAsteroids();
        this.updateBulletCount();
        this.engine.update(t);
        const collisions = this.engine.intersect();
        this.engine.applyCollisionPhysics(collisions);
    }


    updateBulletCount() {
        if (this.spaceShip) {
            document.getElementById("ammo").innerHTML = "bullets: " + this.spaceShip.getAmmoRemaining();
        }
    }

    registerSpawnedAsteroids() {
        const asteroid = this.asteroidSpawner.deque();
        if (asteroid) {
            this.engine.add(asteroid, this.asteroidDespawnPredicate(asteroid));
        }
    }

    render(ctx) {
        this.engine.render(ctx);
        if (this.spaceShip) {
            this.spaceShip.renderAmmo(ctx);
        }
    }

    spaceShipDespawnPredicate(spaceShip) {
        return () => {
            if (spaceShip.getHealthPercentage() <= spaceShip.getHealthThreshold()) {
                this.spaceShip = undefined;
                return true;
            }

            return false;
        }
    }
}

