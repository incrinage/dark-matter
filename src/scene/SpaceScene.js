import { SMALL, XL } from "../entity/asteroid/AsteroidRadius";
import AsteroidSpawner from "../entity/asteroid/AsteroidSpawner";
import Engine from "../engine/Engine";
import { A, D, DOWN, LEFT, RIGHT, S, SPACE_BAR, UP, W } from "../engine/Key";
import SpaceShipSoundCollection from "../sound/spaceship/SpaceShipSoundCollection";
import SpaceShipController from "../SpaceShipController";
import Score from "../score/Score";
import Bullet from "../entity/spaceship/Bullet";
import Asteroid from "../entity/asteroid/Asteroid";
import KeyListener from "../engine/KeyListener";


export default class SpaceScene {
    constructor(spaceship, canvas, audioCtx) {

        this.canvas = canvas;
        this.audioCtx = audioCtx;
        this.spaceShip = spaceship;
        this.score = new Score();

        //engine
        this.keyListener = new KeyListener([
            LEFT, RIGHT, UP, SPACE_BAR, DOWN,
            W, A, S, D
        ]);
        this.engine = new Engine(this.keyListener, this.audioCtx);

        //spaceship controller and asteroid spawner
        this.controller = new SpaceShipController(spaceship);
        this.asteroidSpawner = new AsteroidSpawner(this.canvas);

        //sound connections
        this.mainGain = audioCtx.createGain();
        this.engine.connect(this.mainGain);

        this.spaceShipAudio = new SpaceShipSoundCollection();
        this.thrusterSound = this.spaceShipAudio.createThrusterSound(this.audioCtx)
        this.thrusterSound.connect(this.mainGain);

        this.engine.addTypeToTypeCollisionCallBack(Bullet.name, Asteroid.name, (e1, e2) => {
            //determine which is the asteroid 
            if (e1 instanceof Bullet && e2.getHealth() - e1.getMass() <= 0) {
                this.score.add(e2.getMaxHealth());
            } else if (e1.getHealth() - e2.getMass() <= 0) {
                this.score.add(e1.getMaxHealth());
            }
        });

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
            this.controller.getUpCommand(),
            this.controller.getWCommand(),
            this.controller.getSCommand(),
            this.controller.getACommand(),
            this.controller.getDCommand()
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

    connect(node) {
        this.mainGain.connect(node);
    }

    discconect() {
        this.mainGain.discconect();
    }

    update(t) {
        this.asteroidSpawner.queueAsteroidInterval(t, 2000, XL);
        this.registerSpawnedAsteroids();
        this.updateBulletCount();
        this.updateScore();
        this.engine.update(t);
    }

    updateBulletCount() {
        if (this.spaceShip) {
            document.getElementById("ammo").innerHTML = "bullets: " + this.spaceShip.getAmmoRemaining();
        }
    }

    updateScore() {
        document.getElementById("score-board").innerHTML = "score: " + this.score.getValue();
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

