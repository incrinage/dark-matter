export default class Score {
    constructor() {
        this.value = 0;
    }

    getValue() {
        return this.value;
    }

    add(s) {
        this.value += s;
    }

    setValue(v) {
        this.value = v;
    }
}