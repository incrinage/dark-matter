import Menu from "../../menu/Menu";
import MainMenuTheme from "../../sound/menu/MainMenuTheme";
import Scene from "../Scene";

export default class MenuScene {
    constructor(audioCtx) {
        this.menu = new Menu();
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

    play() {
        this.scene.playSound();
    }

    connect(node) {
        this.sound.connect(node);
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
