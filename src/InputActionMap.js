export default class InputActionMap {

    constructor() {
        this.actionMap = {};
    }

    put(key, action) {
        if (!this.actionMap[key]) {
            this.actionMap[key] = [];
        }
        this.actionMap[key].push(action);
    }

    executeKeyActions(key) {
        if (this.actionMap[key]) {
            this.actionMap[key].forEach(action => {
                action();
            });
        }
    }

}