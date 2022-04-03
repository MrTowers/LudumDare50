import { GameObject } from "./GameObject.js";

export class Component {
    tag: string;
    gameObject?: GameObject;

    constructor () {
        this.tag = "";
    }

    update () {

    }

    render () {

    }

    //events

    onstart () {

    }

    ondestroy () {

    }

    oncollision (collisionObject: GameObject) {
        
    }
}