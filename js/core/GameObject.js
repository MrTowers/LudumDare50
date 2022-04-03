import { Game } from "./Game.js";
import { Transform } from "./Transform.js";
export class GameObject {
    constructor(transform = new Transform()) {
        this.components = [];
        this.tag = "";
        this.transform = transform;
    }
    addComponent(c) {
        this.components.push(c);
        c.gameObject = this;
    }
    removeComponentByTag(tag) {
        let componentsToRemove = [];
        for (let i in this.components) {
            if (this.components[i].tag == tag) {
                componentsToRemove.push(this.components[i]);
            }
        }
        for (let i in componentsToRemove) {
            let c = componentsToRemove[i];
            this.components.splice(this.components.indexOf(c), 1);
        }
    }
    update() {
        for (let i in this.components) {
            this.components[i].update();
        }
    }
    render() {
        for (let i in this.components) {
            this.components[i].render();
        }
    }
    onstart() {
        for (let i in this.components) {
            this.components[i].onstart();
        }
    }
    oncollision(collisionObject) {
        for (let i in this.components) {
            this.components[i].oncollision(collisionObject);
        }
    }
    destroy() {
        for (let i in this.components) {
            this.components[i].ondestroy();
        }
        Game.destroyGameObject(this);
    }
    getPosition() {
        return this.transform.position.clone();
    }
    getRotation() {
        return this.transform.rotation.clone();
    }
    getScale() {
        return this.transform.scale.clone();
    }
    setPosition(position) {
        this.transform.position = position;
    }
    setRotation(angle) {
        this.transform.rotation.setAngle(angle);
    }
    setScale(scale) {
        this.transform.scale = scale;
    }
}
