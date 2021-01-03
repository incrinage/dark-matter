import { canvas } from "../..";
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from "../engine/Key";
import KeyListener from "../engine/KeyListener";
import SpaceShip from "../entity/spaceship/SpaceShip";
import Weapon from "../entity/spaceship/Weapon";
import Menu from "../menu/Menu";
import Scene from "../scene/Scene";
import SceneController from "../scene/SceneController";
import MainMenuTheme from "../sound/menu/MainMenuTheme";
import EntityTest from "./EntityTest";

export default class MainMenuTest {
    constructor() {
        this.audioCtx = new AudioContext();
        this.sceneController = new SceneController();
        const menu = new Menu();
        let fn = () => {
            menu.hide();
            this.menuSound && this.menuSound.pause();
            this.sceneController.setScene(1);
        }

        menu.setNewGameAction(fn);
        this.scene = new Scene([menu]);
        this.sceneController.addScene(this.scene);
        this.sceneController.addScene(new EntityTest(
            new SpaceShip({
                mass: 5,
                health: 5,
                healthThreshold: 0,
                pos: { x: 100, y: 100 },
                weapon: new Weapon()
            }),
            new KeyListener([LEFT, RIGHT, UP, SPACE_BAR, DOWN]),
            canvas, this.audioCtx
        ));

    }


    play() {
        // this.sceneController.play();
    }
    //eventually will become the start screen
    setup() {
        const playbtn = document.getElementById("play");
        playbtn.onclick = () => {
            this.menuSound = new MainMenuTheme().createSound(this.audioCtx);
            this.menuSound.connect(this.audioCtx.destination);
            this.menuSound.getAudio().loop = true;
            this.audioCtx.resume().then(() => {
                this.menuSound.play();
            });
        }
    }

}

let m = new MainMenuTest();

m.setup();

m.play();

