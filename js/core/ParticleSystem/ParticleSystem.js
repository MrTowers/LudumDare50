import { Component } from "../Component.js";
import { rand } from "../funcs/rand.js";
import { Game } from "../Game.js";
import { Vector2 } from "../Vector2.js";
import { Particle } from "./Particle.js";
export class ParticleSystem extends Component {
    constructor(imageName, burstSize, burstsPerSecond) {
        super();
        this.tag = "particle system";
        this.burstSize = burstSize;
        this.burstsPerSecond = burstsPerSecond;
        this.imageName = imageName;
    }
    burst() {
        for (let i = 0; i < this.burstSize; i++) {
            let p = new Particle(this.imageName, { velocity: new Vector2(rand(-1, 1), rand(-1, 1)), life: 2 });
            Game.spawnGameObject(p, new Vector2(0, -700));
        }
    }
}
