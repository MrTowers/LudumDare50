import { Component } from "../core/Component.js";
import { getObjectByTag } from "../core/funcs/getObjectByTag.js";
import { GameObject } from "../core/GameObject.js";
import { canvas, ctx } from "../main.js";
export class Scorer extends GameObject {
    constructor() {
        super();
        this.tag = "scorer";
        this.script = new Script();
        this.addComponent(this.script);
    }
    addCombo(n) {
        this.script.combo += n;
    }
}
class Script extends Component {
    constructor() {
        super();
        this.side = "left";
        this.size = 30;
        this.standardSize = 30;
        this.combo = 1;
        this.tag = "script";
        this.player = getObjectByTag("player");
        this.score = 0;
    }
    update() {
        let plpos = this.player.getPosition();
        if (plpos.x > 0) {
            if (this.side == "right") {
                this.switchSide();
                this.side = "left";
            }
        }
        if (plpos.x < 0) {
            if (this.side == "left") {
                this.switchSide();
                this.side = "right";
            }
        }
        this.size += (this.standardSize - this.size) / 10;
    }
    render() {
        ctx.save();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.font = `${this.size}px Arial`;
        let scoreText = `POINTS: ${this.score.toFixed(0)}`;
        ctx.fillText(scoreText, (canvas.width / 2) - (ctx.measureText(scoreText).width / 2), 50);
        ctx.strokeText(scoreText, (canvas.width / 2) - (ctx.measureText(scoreText).width / 2), 50);
        ctx.fillStyle = "white";
        ctx.fillRect((canvas.width / 2) - 1, 0, 2, canvas.height);
        ctx.restore();
    }
    switchSide() {
        this.score += this.combo;
        this.size += 30;
    }
}
