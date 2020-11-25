import InputActionMap from "./InputActionMap";
import Renderer from "./Renderer";
import UpdateService from "./UpdateService";

export default class Engine {

    constructor(){
        this.renderer = new Renderer();
        this.updateService = new UpdateService();
        this.inputExecutor = new InputActionMap();
    }

    addKeyAction(key, action) {
        this.inputExecutor.put(key, action);
    }

    proccessInput(key) {
        this.inputExecutor.executeKeyActions(key);
    }

    add(entity){
        this.updateService.add(entity);
        this.renderer.add(entity);
    }

    update(t){
        this.updateService.update(t);
    }

    render(ctx){
        this.renderer.render(ctx);
    }
}