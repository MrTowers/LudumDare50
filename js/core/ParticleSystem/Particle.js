import { delta } from "../../main.js";
import { Component } from "../Component.js";
import { GameObject } from "../GameObject.js";
import { Sprite } from "../Sprite.js";
export class Particle extends GameObject {
    constructor(imageName, partSet) {
        super();
        let s = Sprite.from(imageName);
        this.addComponent(s);
        this.addComponent(new Particle.ParticleScript(partSet));
    }
}
Particle.ParticleScript = class extends Component {
    constructor(partset) {
        super();
        this.velocity = partset.velocity;
        this.life = partset.life;
    }
    update() {
        this.gameObject?.setPosition(this.gameObject.getPosition().add(this.velocity).mulByNumber(delta));
        this.life -= delta / 1000;
        if (this.life <= 0) {
            this.gameObject?.destroy();
        }
    }
};
