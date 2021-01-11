import SpaceScene from './src/scene/SpaceScene.js';
import Canvas from './src/Canvas.js';
import KeyListener from './src/engine/KeyListener.js';
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from './src/engine/Key.js';
import SpaceShip from './src/entity/spaceship/SpaceShip.js';
import Weapon from './src/entity/spaceship/Weapon.js';
import SceneController from './src/scene/SceneController.js';
import MenuScene from './src/scene/menu/MenuScene.js';


function DarkMatter() {
    const canvas = new Canvas(700, 600);
    document.getElementById("canvas-div").appendChild(canvas.getCanvasElement());
    const audioCtx = new AudioContext();
    const mainGain = audioCtx.createGain();
    const sceneController = new SceneController(audioCtx, canvas);
    sceneController.connect(mainGain);

    //restart fucntions
    function entitySceneInit() {
        const entityTest = new SpaceScene(
            new SpaceShip({
                mass: 5,
                health: 5,
                healthThreshold: 0,
                pos: { x: 100, y: 100 },
                weapon: new Weapon()
            }),
            canvas,
            audioCtx
        );
        return entityTest;
    };
    const entityTest = entitySceneInit();

    const menuSceneInit = () => {
        const menuScene = new MenuScene(audioCtx, canvas);
        return menuScene;
    };
    const menuScene = menuSceneInit();

    //connect main gain to to speakers
    mainGain.connect(audioCtx.destination);

    menuScene.setSceneCallBack(sceneController.setScene.bind(sceneController));
    const playbtn = document.getElementById("play");
    const mutebtn = document.getElementById("mute");
    const restartBtn = document.getElementById("restart");

    restartBtn.onclick = () => {
        sceneController.restart();
    }

    mutebtn.onclick = () => {
        if (mainGain.gain.value === 0) {
            mainGain.gain.setTargetAtTime(1, audioCtx.currentTime, 0.10)
        } else {
            mainGain.gain.setValueAtTime(0, audioCtx.currentTime, .10);
        }
    }

    playbtn.onclick = () => {
        menuScene.playSound();
    }

    sceneController.addScene({ scene: menuScene, restart: menuSceneInit });
    sceneController.addScene({ scene: entityTest, restart: entitySceneInit });

    sceneController.setScene(0);
    sceneController.play();
}


new DarkMatter();

