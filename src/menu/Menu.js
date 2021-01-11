import NewGameButton from "./NewGameButton";

export default class Menu {
    constructor(width, height) {
        this.menu = document.getElementById("main-menu");
        this.menu.style.width = width;
        this.menu.style.height = height;
        this.newGameButton = new NewGameButton();
    }

    show() {
        this.menu.style.visibility = "visible";
    }

    getDomElement() {
        return this.menu;
    }

    hide() {
        this.menu.style.visibility = "hidden";
    }

    setNewGameAction(fn) {
        this.newGameButton.setOnClick(fn);
    }

    render(ctx) {
        //draw menu design
        this.show();
    }
}