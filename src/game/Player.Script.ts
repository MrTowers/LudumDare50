import { Camera } from "../core/Camera.js";
import { Component } from "../core/Component.js";
import { getObjectByTag } from "../core/funcs/getObjectByTag.js";
import { getScreenPosition } from "../core/funcs/getScreenPosition.js";
import { playAudio } from "../core/funcs/playAudio.js";
import { Game } from "../core/Game.js";
import { GameObject } from "../core/GameObject.js";
import { Input } from "../core/Input.js";
import { Vector2 } from "../core/Vector2.js";
import { delta, OBJECTS, setTimescale } from "../main.js";
import { PowerProgress } from "./PowerProgress.js";
import { Scorer } from "./Scorer.js";


    export class PlayerScript extends Component {
        steering: number;
        steeringSpeed: number = 3;
        powerProgress: PowerProgress;
        power: number;
        powerTarget: number;
        speed: number;
        constructor(powerProgress: PowerProgress) {
            super();
            this.steering = 0;
            this.tag = "playerscript";
            this.powerProgress = powerProgress;
            this.power = 1;
            this.powerTarget = 0;
            this.speed = 3;
        }

        update(): void {
            let v = new Vector2();

            if (Input.getKey("a") || Input.getKey("ArrowLeft")) {
                this.steering -= this.steeringSpeed;
            }

            if (Input.getKey("d") || Input.getKey("ArrowRight")) {
                this.steering += this.steeringSpeed;
            }

            if (Input.getKey(" ")) {
                if (this.power > 0) {
                    this.power -= delta / 1000;
                    setTimescale(0.2);
                }
                else {
                    this.power = 0;
                    setTimescale(1);
                }
            }
            else {
                setTimescale(1);
            }

            if (this.power <= 0) {
                this.gameOver();
            }

            v.x = this.steering * (delta / 10);
            this.steering += -this.steering * 0.1;
            this.gameObject?.setRotation(this.steering * 2)

            v.y = -this.speed * (delta / 10);

            this.gameObject?.setPosition(this.gameObject.getPosition().add(v));
            Camera.setPosition(this.gameObject?.getPosition().add(new Vector2(-this.gameObject.getPosition().x, -300))!);

            this.powerProgress.value = this.powerTarget;

            this.powerTarget += (this.power - this.powerTarget) / 10;

            this.speed += delta / 100000;

            this.power -= delta / 10000;
        }

        onstart(): void {
            setTimescale(1);
        }

        oncollision(collisionObject: GameObject): void {
            if (collisionObject.tag == "timeoid") {
                collisionObject.destroy();
                playAudio("timeoid");
                if (this.power < 1) {
                    this.power+= 0.1;
                    let scorer: Scorer = <Scorer>getObjectByTag("scorer");
                    scorer.addPoints(3);
                }
                Camera.shake(5);
            }
            if (collisionObject.tag == "obstacle") {
                this.power -= 0.4;
                collisionObject.destroy();
                playAudio("hit");
                
                Camera.shake(29);
            }

            if (collisionObject.tag == "combo") {
                collisionObject.destroy();
                playAudio("combo");
                let scr: Scorer = <Scorer>getObjectByTag("scorer");
                scr.addCombo(1);
                Camera.shake(5);
            }
        }

        gameOver () {
            Camera.shake(0);
            setTimescale(0);
        }
    }