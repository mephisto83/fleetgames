
var SpaceWorld = function () {
    this.reset();
}
SpaceWorld.prototype = {
    init: function (start, end, controls) {
        this.start = start;
        this.end = end;
        this.controls = controls;
        this.controlStates = {};
    },
    reset: function () {
        // this.ppx = Math.random(); // puck x,y
        // this.ppy = Math.random();
        // this.pvx = Math.random() * 0.05 - 0.025; // velocity
        // this.pvy = Math.random() * 0.05 - 0.025;
        // this.tx = Math.random(); // target
        // this.ty = Math.random();
        // this.tx2 = Math.random(); // target
        // this.ty2 = Math.random(); // target
        // this.rad = 0.05;
        // this.t = 0;
        this.BADRAD = 0.025;
    },
    getNumStates: function () {
        return 9; // x,y,vx,vy, puck dx,dy
    },
    getMaxNumActions: function () {
        return this.controls.length * 2; // left, right, up, down, nothing
    },
    getState: function () {
        var me = this;
        var relStart = me.start.clone().sub(me.flycontrol.getPosition());
        var relEnd = me.end.clone().sub(me.flycontrol.getPosition());
        var direction = me.flycontrol.getDirection();
        var s = [
            direction.x,
            direction.y,
            direction.z,
            relEnd.x,
            relEnd.y,
            relEnd.z,
            me.flycontrol.acceleration,
            me.flycontrol.deceleration,
            me.flycontrol.currentSpeed
        ];
        return s;
    },
    sampleNextState: function (a) {
        var me = this;
        var _a = a;
        if (_a > this.controls.length) {
            _a = _a - this.controls.length;
        }
        var actionState = this.controlStates[_a];
        if (actionState == undefined || actionState === false) {
            me.flycontrol.checkkeydown({ keyCode: this.controls[a] });
            this.controlStates[a] = true;
        }
        else {
            me.flycontrol.checkkeyup({ keyCode: this.controls[a] });
            this.controlStates[a] = false;
        }

        // world dynamics
        // this.ppx += this.pvx; // newton
        // this.ppy += this.pvy;
        // this.pvx *= 0.95; // damping
        // this.pvy *= 0.95;
        // // agent action influences puck velocity
        // var accel = 0.002;
        // if (a === 0) this.pvx -= accel;
        // if (a === 1) this.pvx += accel;
        // if (a === 2) this.pvy -= accel;
        // if (a === 3) this.pvy += accel;
        // handle boundary conditions and bounce
        // if (this.ppx < this.rad) {
        //     this.pvx *= -0.5; // bounce!
        //     this.ppx = this.rad;
        // }
        // if (this.ppx > 1 - this.rad) {
        //     this.pvx *= -0.5;
        //     this.ppx = 1 - this.rad;
        // }
        // if (this.ppy < this.rad) {
        //     this.pvy *= -0.5; // bounce!
        //     this.ppy = this.rad;
        // }
        // if (this.ppy > 1 - this.rad) {
        //     this.pvy *= -0.5;
        //     this.ppy = 1 - this.rad;
        // }
        // this.t += 1;
        // if (this.t % 100 === 0) {
        //     this.tx = Math.random(); // reset the target location
        //     this.ty = Math.random();
        // }
        // if(this.t % 73 === 0) {
        //   this.tx2 = Math.random(); // reset the target location
        //   this.ty2 = Math.random();
        // }
        // compute distances
        // var dx = this.ppx - this.tx;
        // var dy = this.ppy - this.ty;
        // var d1 = Math.sqrt(dx * dx + dy * dy);
        // var dx = this.ppx - this.tx2;
        // var dy = this.ppy - this.ty2;
        // var d2 = Math.sqrt(dx * dx + dy * dy);
        // var dxnorm = dx / d2;
        // var dynorm = dy / d2;
        // var speed = 0.001;
        // this.tx2 += speed * dxnorm;
        // this.ty2 += speed * dynorm;
        // compute reward
        me.flycontrol.compute(5);
        var r = -me.flycontrol.getNextPosition().distanceTo(me.end); // want to go close to green
        me.flycontrol.uncheck();
        // if (r < this.BADRAD) {
        //     // but if we're too close to red that's bad
        //     r += 2 * (d2 - this.BADRAD) / this.BADRAD;
        // }

        //if(a === 4) r += 0.05; // give bonus for gliding with no force
        // evolve state in time
        var ns = this.getState();
        var out = { 'ns': ns, 'r': r };
        return out;
    }
}