const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

export default class Canvas {
    constructor(w, h){
        canvas.width = w;
        canvas.height = h;
    }
    
    setWidth(w) {
        canvas.width = w;
    }

    setHeight(h) {
        canvas.height = h;
    }

    getWidth(){
        return canvas.width;
    }

    getHeight(){
        return canvas.height;
    }

    getContext() {
        return ctx;
    }

    clear() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    static LEFT = 0;
    static BOTTOM = 1;
    static RIGHT = 2;
    static TOP = 3;

   static getOffScreenOrientation(side, offset) {
    
        switch (side) {
            case this.RIGHT:
                return { pos: { x: canvas.getWidth() + offset, y: canvas.getHeight() / 2 }, theta: 180 };
            case this.BOTTOM:
                return { pos: { x: canvas.getWidth() / 2, y: canvas.getHeight() + offset }, theta: 270 };
            case this.LEFT:
                return { pos: { x: -offset, y: canvas.getHeight() / 2 }, theta: 0 };
            case this.TOP:
                return { pos: { x: canvas.getWidth() / 2, y: -offset }, theta: 90 };
        }
    }
}