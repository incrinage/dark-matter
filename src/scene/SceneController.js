import Canvas, { ctx } from "../Canvas";

let playing = false;
const canvas = new Canvas(700, 600);


export default class SceneController {

    constructor() {
        this.scenes = [];
        this.currentScene = 1;
        this.dt = 0;
        this.update = this.update.bind(this);
    }

    addScene(scene) {
        this.scenes.push(scene);

    }

    setScene(i) {
        this.currentScene = i;
    }


    update(now) {
        canvas.clear();
        const scene = this.scenes[this.currentScene].scene;
        if (now - this.dt > 16) {
            this.dt = now;
            scene.update(now);
        }

        scene.render(ctx);
        requestAnimationFrame(this.update);
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