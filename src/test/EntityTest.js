import { XL } from "../entity/asteroid/AsteroidRadius";
import AsteroidSpawner from "../entity/asteroid/AsteroidSpawner";
import Engine from "../engine/Engine";
import { SPACE_BAR, UP } from "../engine/Key";
import SpaceShipSoundCollection from "../sound/spaceship/SpaceShipSoundCollection";
import SpaceShipController from "../SpaceShipController";


export default class EntityTest {
    constructor(spaceship, keyListener, canvas, audioCtx) {

        this.canvas = canvas;
        this.audioCtx = audioCtx;
        this.spaceShip = spaceship;

        //engine
        this.engine = new Engine(keyListener, this.audioCtx);

        //spaceship controller and asteroid spawner
        this.controller = new SpaceShipController(spaceship);
        this.asteroidSpawner = new AsteroidSpawner(this.canvas);

        //sound connections
        this.mainGain = audioCtx.createGain();
        this.engine.connect(this.mainGain);
        this.spaceShipAudio = new SpaceShipSoundCollection();
        this.thrusterSound = this.spaceShipAudio.createThrusterSound(this.audioCtx)
        this.thrusterSound.connect(this.mainGain);

        //adding spaceShip binding keyActions to controller 
        this.engine.add(spaceship);
        this.engine.addKeyDownAction([
            this.controller.getDownCommand(),
            {
                key: UP, action: () => {
                    if (this.spaceShip.getHealthPercentage() > 0) {
                        this.thrusterSound.play();
                    }
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
                    if (this.spaceShip.getHealthPercentage() <= 0) { return; }

                    //fireWeapon should lead to the sound being made
                    //but the spacebar itself makes the action
                    //would be interesting to have fireWeapon -> CustomSoundEvent
                    const bullet = this.spaceShip.fireWeapon();
                    if (bullet) {
                        const sound = this.spaceShipAudio.createLaserSound(this.audioCtx);
                        sound.connect(this.mainGain);
                        sound.play();

                        //shooting sound
                        this.engine.add(bullet);
                    } else {
                        //clicking sound if empty
                        //reload sound when reloading
                        this.spaceShip.reload();
                    };
                }
            },
        ]);
    }

    play() { }

    connect(node) {
        this.mainGain.connect(node);
    }

    update(t) {
        this.asteroidSpawner.queueAsteroidInterval(t, 2000, XL);
        this.registerSpawnedAsteroids();
        this.updateBulletCount();
        this.engine.update(t);
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

