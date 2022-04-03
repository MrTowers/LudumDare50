import { rand } from "./funcs/rand.js";
export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    mulByNumber(n) {
        return new Vector2(this.x * n, this.y * n);
    }
    divByNumber(n) {
        return new Vector2(this.x / n, this.y / n);
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    static rand(min, max) {
        return new Vector2(rand(min, max), rand(min, max));
    }
}
