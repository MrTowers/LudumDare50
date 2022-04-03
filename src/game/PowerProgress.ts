import { Component } from "../core/Component.js";
import { canvas, ctx } from "../main.js";

export class PowerProgress extends Component {
    value: number;

    constructor () {
        super();
        this.tag = "power progress";
        this.value = 0;
    }
    render(): void {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.fillRect((canvas.width / 2) - ((canvas.width / 2) * this.value), canvas.height - 5, canvas.width * this.value, 5);
        ctx.restore();
    }
}