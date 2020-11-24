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
}