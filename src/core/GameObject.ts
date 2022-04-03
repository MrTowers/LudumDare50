import { Component } from "./Component.js";
import { Game } from "./Game.js";
import { Rotator } from "./Rotator.js";
import { Transform } from "./Transform.js";
import { Vector2 } from "./Vector2.js";

export class GameObject {
    components: Component[] = [];
    tag: string;
    transform: Transform;

    constructor (transform = new Transform()) {
        this.tag = "";
        this.transform = transform
    }

    addComponent (c: Component) {
        this.components.push(c);
        c.gameObject = this;
    }

    removeComponentByTag (tag: string) {
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

    update () {
        for (let i in this.components) {
            this.components[i].update();
        }
    }

    render () {
        for (let i in this.components) {
            this.components[i].render();
        }
    }

    onstart () {
        for (let i in this.components) {
            this.components[i].onstart();
        }
    }

    oncollision (collisionObject: GameObject) {
        for (let i in this.components) {
            this.components[i].oncollision(collisionObject);
        }
    }

    destroy () {
        for (let i in this.components) {
            this.components[i].ondestroy();
        }
        Game.destroyGameObject(this);
    }

    getPosition () : Vector2 {
        return this.transform.position.clone();
    }

    getRotation () : Rotator {
        return this.transform.rotation.clone();
    }

    getScale () : Vector2 {
        return this.transform.scale.clone();
    }

    setPosition (position: Vector2) {
        this.transform.position = position;
    }

    setRotation (angle: number) {
        this.transform.rotation.setAngle(angle);
    }

    setScale (scale: Vector2) {
        this.transform.scale = scale;
    }
}