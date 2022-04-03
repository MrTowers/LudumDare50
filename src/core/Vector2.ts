export class Vector2 {
    x: number;
    y: number;

    constructor (x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add (v: Vector2) : Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    sub (v: Vector2) : Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    mulByNumber (n: number) : Vector2 {
        return new Vector2(this.x * n, this.y * n);
    }

    divByNumber (n: number) : Vector2 {
        return new Vector2(this.x / n, this.y / n);
    }

    clone () : Vector2 {
        return new Vector2(this.x, this.y);
    }
}