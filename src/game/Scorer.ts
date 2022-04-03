import { Component } from "../core/Component.js";
import { getObjectByTag } from "../core/funcs/getObjectByTag.js";
import { playAudio } from "../core/funcs/playAudio.js";
import { GameObject } from "../core/GameObject.js";
import { canvas, ctx } from "../main.js";
import { Player } from "./Player.js";

type ESide = "left" | "right";

export class Scorer extends GameObject {
    script: Script;
    constructor () {
        super();
        this.tag = "scorer";
        this.script = new Script();
        this.addComponent(this.script);
    }

    addCombo (n: number) {
        this.script.combo+=n;
    }

    addPoints (n: number) {
        this.script.score += n * this.script.combo;
        this.script.size += 30 * n;
    }
}

class Script extends Component {
    player: Player;
        side: ESide = "left";
        score: number;
        size: number = 30;
        standardSize: number = 30;
        combo: number = 1;
        constructor () {
            super();
            this.tag = "script";
            this.player = <Player>getObjectByTag("player")!;
            this.score = 0;
        }

        update(): void {
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

        render(): void {
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

        switchSide () {
            this.score+= this.combo;
            this.size+= 30;
            this.player.addPower(0.1);
            playAudio("point", 0.5);
        }
}