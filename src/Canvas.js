

export default class Canvas {
    constructor(w, h) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = w;
        this.canvas.height = h;
        this.ctx = this.canvas.getContext('2d');
    }

    getCanvasElement() {
        return this.canvas;
    }

    setWidth(w) {
        this.canvas.width = w;
    }

    setHeight(h) {
        this.canvas.height = h;
    }

    getWidth() {
        return this.canvas.width;
    }

    getHeight() {
        return this.canvas.height;
    }

    getContext() {
        return this.ctx;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    static LEFT = 0;
    static BOTTOM = 1;
    static RIGHT = 2;
    static TOP = 3;

    static getOffScreenOrientation(side, offset) {

        switch (side) {
            case this.RIGHT:
                return { pos: { x: this.canvas.getWidth() + offset, y: this.canvas.getHeight() / 2 }, theta: 180 };
            case this.BOTTOM:
                return { pos: { x: this.canvas.getWidth() / 2, y: this.canvas.getHeight() + offset }, theta: 270 };
            case this.LEFT:
                return { pos: { x: -offset, y: this.canvas.getHeight() / 2 }, theta: 0 };
            case this.TOP:
                return { pos: { x: this.canvas.getWidth() / 2, y: -offset }, theta: 90 };
        }
    }
}