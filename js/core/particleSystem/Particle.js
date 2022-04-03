import { canvas, delta } from "../../main.js";
import { Component } from "../Component.js";
import { getScreenPosition } from "../funcs/getScreenPosition.js";
import { rand } from "../funcs/rand.js";
import { Game } from "../Game.js";
import { GameObject } from "../GameObject.js";
import { Sprite } from "../Sprite.js";
import { Vector2 } from "../Vector2.js";
export class Particle extends GameObject {
    constructor(life, texture) {
        super();
        this.addComponent(new Script(life));
        this.addComponent(Sprite.from(texture));
        this.setScale(new Vector2(0.025, 0.025));
        this.setRotation(rand(0, 360));
    }
    static burst(position, amount, texture, life) {
        for (let i = 0; i < amount; i++) {
            Game.spawnGameObject(new Particle(life, texture), position);
        }
    }
}
class Script extends Component {
    constructor(life) {
        super();
        this.rotating = rand(-10, 10);
        this.maxsize = 0.05;
        this.velocity = Vector2.rand(-300, 300);
        this.life = life;
        this.startlife = life;
    }
    update() {
        this.gameObject?.setPosition(this.gameObject.getPosition().add(this.velocity.mulByNumber(delta / 1000)));
        this.life -= delta / 1000;
        if (this.life <= 0) {
            this.gameObject?.destroy();
        }
        this.gameObject?.setRotation(this.gameObject.getRotation().angle + this.rotating);
        let screenpos = getScreenPosition(this.gameObject);
        if (screenpos.x > canvas.width || screenpos.x < 0 || screenpos.y > canvas.height || screenpos.y < 0) {
            this.gameObject?.destroy();
        }
        this.gameObject?.setScale(new Vector2(this.maxsize, this.maxsize).mulByNumber(this.life / this.startlife));
    }
}
