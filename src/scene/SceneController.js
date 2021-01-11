import { canvas } from "../..";

let playing = false;


export default class SceneController {

    constructor(audioCtx, canvas) {
        this.scenes = [];
        this.currentScene = 0;
        this.dt = 0;
        this.canvas = canvas;
        this.audioCtx = audioCtx
        this.mainGain = this.audioCtx.createGain();
        this.update = this.update.bind(this);
    }

    addScene(scene) {
        this.scenes.push(scene);
    }

    setScene(i) {
        const scene = this.scenes[this.currentScene].scene;
        if (scene) { scene.disconnect() };
        this.currentScene = i;
        this.scenes[this.currentScene].scene.connect(this.mainGain);
    }

    update(now) {
        this.canvas.clear();
        let s = this.scenes[this.currentScene];
        if (!s) return;
        const scene = s.scene;
        if (now - this.dt > 16) {
            this.dt = now;
            scene.update(now);
        }

        scene.render(this.canvas.getContext());
        requestAnimationFrame(this.update);
    }

    connect(node) {
        this.mainGain.connect(node);
    }

    restart() {
        const scene = this.scenes[this.currentScene].restart();
        this.scenes[this.currentScene].scene = scene;
    }

    play() {
        if (!playing) {
            playing = true;
            requestAnimationFrame(this.update);
        }
    }

}