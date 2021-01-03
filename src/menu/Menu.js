import { canvas } from "../Canvas";
import NewGameButton from "./NewGameButton";

export default class Menu {
    constructor() {
        this.menu = document.getElementById("main-menu");
        this.menu.style.width = canvas.width;
        this.menu.style.height = canvas.height;
        this.newGameButton = new NewGameButton();
    }

    show() {
        this.menu.style.visibility = "visible";
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