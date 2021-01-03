export default class Scene {
    constructor(objects, sound) {
        this.objects = objects;
        this.sound = sound;
    }

    playSound() {
        this.sound.play();
    }

    render(ctx) {
        this.objects.forEach(element => {
            element.render(ctx);
        });
    }

    update(t) {

    }
}