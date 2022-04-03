import { ctx, OBJECTS, TEXTURES } from "../main.js";
import { DisplayObject } from "./DisplayObject.js";
export class Sprite extends DisplayObject {
    constructor() {
        super();
        this.motionBlur = [];
        this.motionBlurMax = 2;
        this.tag = "sprite";
    }
    render() {
        if (this.image) {
            if (this.image.width) {
                //motion blur
                for (let i in this.motionBlur) {
                    let pos = this.motionBlur[i];
                    let scale = this.getRenderScale();
                    let rot = this.getRenderRotation();
                    ctx.save();
                    ctx.globalAlpha = (Number(i) / this.motionBlurMax);
                    ctx.filter = `blur(${5 * Number(i)}px)`;
                    ctx.translate(pos.x, pos.y);
                    ctx.scale(scale.x, scale.y);
                    ctx.rotate(rot.getAngle());
                    ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
                    ctx.restore();
                }
                //sprite
                let pos = this.getRenderPosition();
                let scale = this.getRenderScale();
                let rot = this.getRenderRotation();
                if (this.motionBlur.length < this.motionBlurMax) {
                    this.motionBlur.push(pos);
                }
                else {
                    this.motionBlur.splice(0, 1);
                    this.motionBlur.push(pos);
                }
                ctx.save();
                ctx.translate(pos.x, pos.y);
                ctx.scale(scale.x, scale.y);
                ctx.rotate(rot.getAngle());
                ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
                ctx.restore();
            }
        }
    }
    update() {
        if (OBJECTS.length > 40) {
            this.motionBlurMax = 1;
        }
        else {
            this.motionBlurMax = 2;
        }
    }
    static from(name) {
        if (TEXTURES[name] == null) {
            console.error(`Texture ${name} cannot be found`);
            return new Sprite();
        }
        let s = new Sprite();
        s.image = TEXTURES[name];
        return s;
    }
}
