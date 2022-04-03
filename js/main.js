import { Camera } from "./core/Camera.js";
import { Game } from "./core/Game.js";
import { Load } from "./core/Load.js";
import { Vector2 } from "./core/Vector2.js";
import { BG } from "./game/BG.js";
import { Generator } from "./game/Generator.js";
import { Timeoid } from "./game/pickups/Timeoid.js";
import { Player } from "./game/Player.js";
import { Scorer } from "./game/Scorer.js";
export const canvas = document.createElement("canvas");
export const ctx = canvas.getContext("2d");
export const TEXTURES = {};
export const AUDIOSRC = {};
export let OBJECTS = [];
export const MAINCAMERA = new Camera();
export let delta = 0;
let lasttime = 0;
let timescale = 1;
let renderTime = {
    acc: 0,
    last: 0
};
let updateTime = {
    acc: 0,
    last: 0
};
let collTime = {
    acc: 0,
    last: 0
};
export let collisionObjects = [];
canvas.style.backgroundColor = "black";
document.body.style.padding = "0px";
document.body.style.margin = "0px";
document.body.style.overflow = "hidden";
document.body.appendChild(canvas);
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
window.addEventListener("load", resize);
function calcDelta() {
    delta = (performance.now() - lasttime) * timescale;
    lasttime = performance.now();
}
export function setTimescale(n) {
    timescale = n;
}
function tick() {
    MAINCAMERA.update();
    calcDelta();
    collTime.last = performance.now();
    checkCollisions();
    collTime.acc = performance.now() - collTime.last;
    updateTime.last = performance.now();
    update();
    updateTime.acc = performance.now() - updateTime.last;
    renderTime.last = performance.now();
    render();
    renderTime.acc = performance.now() - renderTime.last;
    requestAnimationFrame(tick);
}
function update() {
    for (let i in OBJECTS) {
        OBJECTS[i].update();
    }
}
function checkCollisions() {
    for (let i in collisionObjects) {
        let object = collisionObjects[i];
        for (let j in collisionObjects) {
            let anotherobj = collisionObjects[j];
            if (object == anotherobj) {
                continue;
            }
            //checking
            let objpos = object.getPosition();
            let objscale = object.getScale().mulByNumber(500);
            let anobjpos = anotherobj.getPosition();
            let anobjscale = anotherobj.getScale().mulByNumber(500);
            if (objpos.x + (objscale.x / 2) > anobjpos.x - (anobjscale.x / 2)) {
                if (objpos.x - (objscale.x / 2) < anobjpos.x + (anobjscale.x / 2)) {
                    if (objpos.y + (objscale.y / 2) > anobjpos.y - (anobjscale.y / 2)) {
                        if (objpos.y - (objscale.y / 2) < anobjpos.y + (anobjscale.y / 2)) {
                            object.oncollision(anotherobj);
                        }
                    }
                }
            }
        }
    }
}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i in OBJECTS) {
        OBJECTS[i].render();
    }
    ctx.save();
    ctx.fillStyle = "white";
    ctx.fillText(`FPS: ${(1000 / delta).toFixed(0)}`, 3, 10);
    ctx.fillText(`update time: ${updateTime.acc.toFixed(0)}ms`, 3, 20);
    ctx.fillText(`collisions time: ${collTime.acc.toFixed(0)}ms`, 3, 30);
    ctx.fillText(`render time: ${renderTime.acc.toFixed(0)}ms`, 3, 40);
    ctx.fillText(`objects count: ${OBJECTS.length}`, 3, 50);
    ctx.restore();
}
async function loadAssets() {
    await Load.image("assets/textures/player.png", "player");
    await Load.image("assets/textures/timeoid.png", "timeoid");
    await Load.image("assets/textures/rectangle.png", "rect");
    await Load.image("assets/textures/bg.png", "bg");
    await Load.image("assets/textures/combo up.png", "combo");
    start();
}
function start() {
    Game.spawnGameObject(new BG());
    Game.spawnGameObject(new Player());
    for (let i = 0; i < 10; i++) {
        Game.spawnGameObject(new Timeoid(), new Vector2(0, -500));
    }
    Game.spawnGameObject(new Generator());
    Game.spawnGameObject(new Scorer());
    tick();
}
loadAssets();
