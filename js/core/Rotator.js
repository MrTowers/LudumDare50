export class Rotator {
    constructor(angle = 0) {
        this.angle = 0;
        this.setAngle(angle);
    }
    setAngle(angle) {
        while (angle > 360) {
            angle -= 360;
        }
        this.angle = angle;
    }
    getAngle() {
        return this.angle / 180 * Math.PI;
    }
    clone() {
        return new Rotator(this.angle);
    }
}
