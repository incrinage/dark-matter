import { M, XL } from "../entity/asteroid/AsteroidRadius";
import AsteroidSpawner from "../entity/asteroid/AsteroidSpawner";
import Engine from "../engine/Engine";
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from "../Key";
import MainMenuTheme from "../sound/menu/MainMenuTheme.js";
import SpaceShipSoundCollection from "../sound/spaceship/SpaceShipSoundCollection";
import SpaceShipController from "../SpaceShipController";


export default class EntityTest {
    constructor(spaceship, keyListener, canvas) {
        this.canvas = canvas;
        const mainMenuTheme = new MainMenuTheme();
        mainMenuTheme.play();
        this.audioCtx = new AudioContext();
        this.spaceShip = spaceship;
        this.spaceShipAudio = new SpaceShipSoundCollection();
        this.thrusterSound = this.spaceShipAudio.createThrusterSound(this.audioCtx)
        this.laserSound = this.spaceShipAudio.createLaserSound(this.audioCtx);
        this.keyListener = keyListener;
        this.asteroidSpawner = new AsteroidSpawner(this.canvas);

        this.engine = new Engine();
        this.engine.add(spaceship);
        this.controller = new SpaceShipController(spaceship);

        this.engine.addKeyAction([
            this.controller.getDownCommand(),
            this.controller.getLeftCommand(),
            this.controller.getRightCommand(),
            this.controller.getUpCommand()
        ]);



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
                    this.engine.add(bullet);
                } else {
                    //clicking sound if empty
                    //reload sound when reloading
                    this.spaceShip.reload();
                };
            }
        })

    }

    update(t) {
        const keyEvents = this.keyListener.flushQueue();
        this.engine.updateHeldKeys(keyEvents);
        this.asteroidSpawner.queueAsteroidInterval(t, 2000, XL);
        this.registerSpawnedAsteroids();
        this.updateBulletCount();
        this.engine.update(t);
        const collisions = this.engine.intersect();
        this.engine.invokeCollisionInteractions(collisions, this.audioCtx);
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
            this.engine.add(asteroid);
        }
    }

    render(ctx) {
        this.engine.render(ctx);
    }
}

