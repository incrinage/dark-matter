
export default class NewGameButton {
    constructor(button) {
        this.button = button || document.getElementById("new-game-btn");
    }

    setOnClick(fn) {
        this.button.onclick = fn;
    }
}