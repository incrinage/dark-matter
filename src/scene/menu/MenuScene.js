import { getCanvasHeight, getCanvasWidth } from "../../..";
import Menu from "../../menu/Menu";
import MainMenuTheme from "../../sound/menu/MainMenuTheme";
import Scene from "../Scene";

export default class MenuScene {
    constructor(audioCtx, canvas) {
        this.menu = new Menu(canvas.getWidth(), canvas.getHeight());
        this.sound = new MainMenuTheme().createSound(audioCtx);
        this.sound.getAudio().loop = true;
        this.sceneCallBack = () => { };

        this.menu.setNewGameAction(() => {
            this.menu.hide();
            this.sound.pause();
            this.sceneCallBack(1);
        });

        this.scene = new Scene([this.menu], this.sound);
    }

    playSound() {
        this.scene.playSound();
    }

    connect(node) {
        this.sound.connect(node);
    }

    disconnect(){
        this.sound.disconnect()
    }

    setSceneCallBack(cb) {
        this.sceneCallBack = cb;
    }

    render(ctx) {
        this.scene.render(ctx);
    }

    update(t) {
        this.scene.update(t);
    }
}
