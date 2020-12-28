import { M, XL } from "../entity/asteroid/AsteroidRadius";
import AsteroidSpawner from "../entity/asteroid/AsteroidSpawner";
import Engine from "../engine/Engine";
import { SPACE_BAR, UP } from "../engine/Key";
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
        //space ship sounds 
        this.spaceShipAudio = new SpaceShipSoundCollection();
        this.thrusterSound = this.spaceShipAudio.createThrusterSound(this.audioCtx)
        this.laserSound = this.spaceShipAudio.createLaserSound(this.audioCtx);


        this.keyListener = keyListener;
        this.asteroidSpawner = new AsteroidSpawner(this.canvas);

        this.engine = new Engine();
        this.engine.add(spaceship);
        this.controller = new SpaceShipController(spaceship);

        this.engine.addKeyDownAction([
            this.controller.getDownCommand(),
            {
                key: UP, action: () => {
                    this.thrusterSound.play();
                }
            },
            this.controller.getLeftCommand(),
            this.controller.getRightCommand(),
            this.controller.getUpCommand()
        ]);

        this.engine.addKeyUpAction([
            {
                key: UP, action: () => {
                    this.thrusterSound.pause();

                }
            },
            {
                key: SPACE_BAR, action: () => {
                    //fireWeapon should lead to the sound being made
                    //but the spacebar itself makes the action
                    //would be interesting to have fireWeapon -> CustomSoundEvent
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
            },
        ])



    }

    update(t) {



        //--
        //the following can happen in any order and is not related to the engine.
        this.asteroidSpawner.queueAsteroidInterval(t, 2000, XL);
        this.registerSpawnedAsteroids();
        this.updateBulletCount();
        //--

        this.engine.update(t);

        //--
        //this code can be done in this.engine.update(t)
        const keyEvents = this.keyListener.flushQueue();
        const releasedKeys = this.engine.updateHeldKeys(keyEvents);
        this.engine.executeKeyDownActions();
        this.engine.executeKeyUpActions(releasedKeys);
        //--

        //-
        //could also be done by the engine
        const collisions = this.engine.intersect();
        this.engine.invokeCollisionInteractions(collisions, this.audioCtx);
        this.engine.applyCollisionPhysics(collisions);
        //-
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

