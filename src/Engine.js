import InputActionMap from "./InputActionMap";
import Renderer from "./Renderer";
import UpdateService from "./UpdateService";

export default class Engine {

    constructor() {
        this.renderer = new Renderer();
        this.updateService = new UpdateService();
        this.inputActionMap = new InputActionMap();
        this.pressedKeys = {};
    }

    addKeyAction(key, action) {
        this.inputActionMap.put(key, action);
    }

    proccessInput(keyEvents) {
        if (!keyEvents) return;
        keyEvents.forEach(({ key, type }) => {
            if (type == "keydown") {
                console.log(key, type);
                this.pressedKeys[key] = true;
            } else if (type == "keyup") {
                delete this.pressedKeys[key];
            }
        });

        for(const key in this.pressedKeys){
            if(this.pressedKeys[key]){
                this.inputActionMap.executeKeyActions(key);
            }
        }

    }

    add(entity) {
        this.updateService.add(entity);
        this.renderer.add(entity);
    }

    update(t) {
        this.updateService.update(t);
    }

    render(ctx) {
        this.renderer.render(ctx);
    }
}