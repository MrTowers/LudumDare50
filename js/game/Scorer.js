import { Component } from "../core/Component.js";
import { getObjectByTag } from "../core/funcs/getObjectByTag.js";
import { playAudio } from "../core/funcs/playAudio.js";
import { GameObject } from "../core/GameObject.js";
import { canvas, ctx } from "../main.js";
import { scoreFormat } from "./scoreFormat.js";
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
    addPoints(n) {
        this.script.score += n * this.script.combo;
        this.script.size += 30 * n;
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
        ctx.fillStyle = "black";
        ctx.strokeStyle = "black";
        ctx.font = `${this.size}px Arial`;
        let scoreText = `${scoreFormat(this.score)}`;
        ctx.fillText(scoreText, (canvas.width - 100) - (ctx.measureText(scoreText).width / 2), 50);
        ctx.fillStyle = "white";
        ctx.fillText(scoreText, (canvas.width - 100) - (ctx.measureText(scoreText).width / 2), 48);
        ctx.fillStyle = "black";
        let hsText = `BEST ${scoreFormat(Number(localStorage.getItem("timeoid_hs")))}`;
        ctx.fillText(hsText, canvas.width - 143 - (ctx.measureText(hsText).width / 2), 80);
        ctx.fillStyle = "white";
        ctx.fillText(hsText, canvas.width - 143 - (ctx.measureText(hsText).width / 2), 78);
        ctx.fillStyle = "white";
        ctx.fillRect((canvas.width / 2) - 1, 0, 2, canvas.height);
        ctx.restore();
    }
    switchSide() {
        this.score += this.combo;
        this.size += 30;
        this.player.addPower(0.1);
        playAudio("point", 0.5);
    }
    saveBestScore() {
        let highscore = Number(localStorage.getItem("timeoid_hs"));
        if (highscore == null || isNaN(highscore)) {
            localStorage.setItem("timeoid_hs", Number(0).toString());
            this.saveBestScore();
        }
        if (this.score > highscore) {
            localStorage.setItem("timeoid_hs", this.score.toString());
        }
    }
}
