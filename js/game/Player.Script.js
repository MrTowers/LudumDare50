import { Camera } from "../core/Camera.js";
import { Component } from "../core/Component.js";
import { getObjectByTag } from "../core/funcs/getObjectByTag.js";
import { Input } from "../core/Input.js";
import { Vector2 } from "../core/Vector2.js";
import { delta, setTimescale } from "../main.js";
export class PlayerScript extends Component {
    constructor(powerProgress) {
        super();
        this.steeringSpeed = 3;
        this.steering = 0;
        this.tag = "playerscript";
        this.powerProgress = powerProgress;
        this.power = 1;
        this.powerTarget = 0;
    }
    update() {
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
        this.gameObject?.setRotation(this.steering * 2);
        v.y = -3 * (delta / 10);
        this.gameObject?.setPosition(this.gameObject.getPosition().add(v));
        Camera.setPosition(this.gameObject?.getPosition().add(new Vector2(-this.gameObject.getPosition().x, -300)));
        this.powerProgress.value = this.powerTarget;
        this.powerTarget += (this.power - this.powerTarget) / 10;
    }
    onstart() {
        setTimescale(1);
    }
    oncollision(collisionObject) {
        if (collisionObject.tag == "timeoid") {
            collisionObject.destroy();
            if (this.power < 1) {
                this.power += 0.1;
            }
            Camera.shake(5);
        }
        if (collisionObject.tag == "obstacle") {
            this.power -= 0.4;
            collisionObject.destroy();
            Camera.shake(29);
        }
        if (collisionObject.tag == "combo") {
            collisionObject.destroy();
            let scr = getObjectByTag("scorer");
            scr.addCombo(1);
            Camera.shake(5);
        }
    }
    gameOver() {
        Camera.shake(0);
        setTimescale(0);
    }
}
