import EntityTest from './src/test/EntityTest.js';
import Canvas from './src/Canvas.js';
import KeyListener from './src/engine/KeyListener.js';
import { DOWN, LEFT, RIGHT, SPACE_BAR, UP } from './src/engine/Key.js';
import SpaceShip from './src/entity/spaceship/SpaceShip.js';
import Weapon from './src/entity/spaceship/Weapon.js';
import SceneController from './src/scene/SceneController.js';
import MenuScene from './src/scene/menu/MenuScene.js';


export const canvas = new Canvas(700, 600);

function DarkMatter() {
    const sceneController = new SceneController();

    //-
    //the scenecontroller should own the audio context as well as 
    //connecting scenes to the main audio
    //https://trello.com/c/1PvXnfa4/84-general-refactor
    //-
    const audioCtx = new AudioContext();
    const mainGain = audioCtx.createGain();

    //restart fucntions
    function entityRestart() {
        const entityTest = new EntityTest(
            new SpaceShip({
                mass: 5,
                health: 5,
                healthThreshold: 0,
                pos: { x: 100, y: 100 },
                weapon: new Weapon()
            }),
            new KeyListener([LEFT, RIGHT, UP, SPACE_BAR, DOWN]),
            canvas,
            audioCtx
        );
        entityTest.connect(mainGain);
        return entityTest;
    };
    const entityTest = entityRestart();

    const menuRestart = () => {
        const menuScene = new MenuScene(audioCtx);
        menuScene.connect(mainGain);
        return menuScene;
    };
    const menuScene = menuRestart(audioCtx, mainGain);

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
        menuScene.play();
    }


    sceneController.addScene({ scene: menuScene, restart: menuRestart });
    sceneController.addScene({ scene: entityTest, restart: entityRestart });

    sceneController.setScene(0);
    sceneController.play();
}


new DarkMatter();

