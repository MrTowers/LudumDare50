import { Component } from "../core/Component.js";
import { GameObject } from "../core/GameObject.js";
import { canvas, ctx, TEXTURES } from "../main.js";

export class BG extends GameObject {
    static Script = class extends Component {
        offset: number;
        constructor () {
            super();
            this.offset = 0;
        }

        render(): void {
            ctx.save();
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(TEXTURES["bg"], 0, -this.offset, canvas.width, canvas.height);
            ctx.drawImage(TEXTURES["bg"], 0, -canvas.height - this.offset, canvas.width, canvas.height);
            ctx.restore();

            this.offset--;

            if (this.offset <= -canvas.height) {
                this.offset = 0;
            }
        }
    }
    constructor () {
        super();
        this.addComponent(new BG.Script());
    }
}