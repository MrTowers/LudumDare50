export class Input {
    static keys: any = {};

    constructor () {
        document.addEventListener("keydown", (e) => {
            //console.log(e.key);
            Input.keys[e.key] = true;
        });

        document.addEventListener("keyup", (e) => {
            Input.keys[e.key] = false;
        });
    }

    static getKey (key: string) : boolean {
        return this.keys[key];
    }
}

new Input();