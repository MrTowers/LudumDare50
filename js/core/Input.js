export class Input {
    constructor() {
        document.addEventListener("keydown", (e) => {
            //console.log(e.key);
            Input.keys[e.key] = true;
        });
        document.addEventListener("keyup", (e) => {
            Input.keys[e.key] = false;
        });
    }
    static getKey(key) {
        return this.keys[key];
    }
}
Input.keys = {};
new Input();
