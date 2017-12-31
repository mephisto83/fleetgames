


/**
 * @author mrdoob / http://mrdoob.com/
 * @author alteredq / http://alteredqualia.com/
 * @author paulirish / http://paulirish.com/
 */


function mindFlyControl(object, domElement, opts) {

    this.object = object;

    opts = opts || {};

    this.domElement = (domElement !== undefined) ? domElement : document;
    if (domElement) this.domElement.setAttribute('tabindex', -1);
    domElement = this.domElement;
    // API
    this.acceleration = 0.0001;
    this.flying = opts.flying || false;
    this.currentSpeed = 0;
    this.movementSpeed = (opts.movementSpeed === undefined) ? 1.0 : opts.movementSpeed;
    this.rollSpeed = (opts.rollSpeed === undefined) ? 0.005 : opts.rollSpeed;

    this.dragToLook = true;
    this.autoForward = false;

    // disable default target object behavior

    // internals

    this.tmpQuaternion = new THREE.Quaternion();
    this.tmpRot = new THREE.Vector3();
    this.moveMult = 0;
    this.rotMult = 0;
    this.mouseStatus = 0;
    function getDefaultMoveState() {
        return {
            accelerate: 0,
            decelerate: 0,
            up: 0,
            down: 0,
            left: 0,
            right: 0,
            forward: 0,
            back: 0,
            pitchUp: 0,
            pitchDown: 0,
            yawLeft: 0,
            yawRight: 0,
            rollLeft: 0,
            rollRight: 0
        };
    }
    this.moveState = getDefaultMoveState();
    this.moveVector = new THREE.Vector3(0, 0, 0);
    this.rotationVector = new THREE.Vector3(0, 0, 0);

    var prevTime = Date.now();


    this.handleEvent = function (event) {

        if (typeof this[event.type] == 'function') {

            this[event.type](event);

        }

    };
    this.checkkeydown = function (event) {
        this.checkit();
        this.keydown(event);
    }
    this.checkit = function () {
        this.checked = {
            moveState: Object.assign({}, this.moveState),
            moveVector: this.moveVector.clone(),
            currentSpeed: this.currentSpeed,
            rotationVector: this.rotationVector.clone()
        };
    }
    this.checkkeyup = function (event) {
        this.checkit();
        this.keyup(event);
    }
    this.uncheck = function () {
        this.moveState = this.checked.moveState;
        this.rotationVector = this.checked.rotationVector;
        this.moveVector = this.checked.moveVector;
    }

    this.keydown = function (event) {

        if (event.altKey) {

            return;

        }


        switch (event.keyCode) {

            case 16: /* shift */ this.movementSpeedMultiplier = .1; break;
            case 32: /* return */ this.moveState.accelerate = 1; break;
            case 90: /* Z */ this.moveState.decelerate = 1; break;

            case 87: /*W*/ this.moveState.forward = 1; break;
            case 83: /*S*/ this.moveState.back = 1; break;

            case 65: /*A*/ this.moveState.left = 1; break;
            case 68: /*D*/ this.moveState.right = 1; break;

            case 82: /*R*/ this.moveState.up = 1; break;
            case 70: /*F*/ this.moveState.down = 1; break;

            case 38: /*up*/ this.moveState.pitchUp = 1; break;
            case 40: /*down*/ this.moveState.pitchDown = 1; break;

            case 37: /*left*/ this.moveState.yawLeft = 1; break;
            case 39: /*right*/ this.moveState.yawRight = 1; break;

            case 81: /*Q*/ this.moveState.rollLeft = 1; break;
            case 69: /*E*/ this.moveState.rollRight = 1; break;
            case -1 /* do nothing*/: break;
                break;
            default:
                console.log(event.keyCode);
                break;
        }

        var surpress = [38, 40, 37, 39];

        if (surpress.indexOf(event.keyCode) > -1) {
            if (event.preventDefault)
                event.preventDefault();
        }
        if (!this.flying)
            this.updateMovementVector();
        this.updateRotationVector();

    };

    this.keyup = function (event) {

        switch (event.keyCode) {

            case 16: /* shift */ this.movementSpeedMultiplier = 1; break;
            case 32: /* return */ this.moveState.accelerate = 0; break;
            case 90: /* Z */ this.moveState.decelerate = 0; break;


            case 87: /*W*/ this.moveState.forward = 0; break;
            case 83: /*S*/ this.moveState.back = 0; break;

            case 65: /*A*/ this.moveState.left = 0; break;
            case 68: /*D*/ this.moveState.right = 0; break;

            case 82: /*R*/ this.moveState.up = 0; break;
            case 70: /*F*/ this.moveState.down = 0; break;

            case 38: /*up*/ this.moveState.pitchUp = 0; break;
            case 40: /*down*/ this.moveState.pitchDown = 0; break;

            case 37: /*left*/ this.moveState.yawLeft = 0; break;
            case 39: /*right*/ this.moveState.yawRight = 0; break;

            case 81: /*Q*/ this.moveState.rollLeft = 0; break;
            case 69: /*E*/ this.moveState.rollRight = 0; break;

            case -1 /* do nothing*/: break;
        }
        if (!this.flying)
            this.updateMovementVector();
        this.updateRotationVector();

    };

    this.mousedown = function (event) {

        if (domElement !== document) {

            domElement.focus();

        }

        event.preventDefault();
        event.stopPropagation();

        if (this.dragToLook) {

            this.mouseStatus++;

        } else {

            switch (event.button) {

                case 0: this.moveState.forward = 1; break;
                case 2: this.moveState.back = 1; break;

            }
            if (!this.flying)
                this.updateMovementVector();

        }

    };

    this.mousemove = function (event) {

        if (!this.dragToLook || this.mouseStatus > 0) {

            var container = this.getContainerDimensions();
            var halfWidth = container.size[0] / 2;
            var halfHeight = container.size[1] / 2;

            this.moveState.yawLeft = - ((event.pageX - container.offset[0]) - halfWidth) / halfWidth;
            this.moveState.pitchDown = ((event.pageY - container.offset[1]) - halfHeight) / halfHeight;

            this.updateRotationVector();

        }

    };


    this.mouseout = function (event) {

        event.preventDefault();
        event.stopPropagation();
        this.moveState = getDefaultMoveState();
        this.updateRotationVector();
        if (!this.flying)
            this.updateMovementVector();
    };

    this.mouseup = function (event) {

        event.preventDefault();
        event.stopPropagation();

        if (this.dragToLook) {

            this.mouseStatus--;

            this.moveState.yawLeft = this.moveState.pitchDown = 0;

        } else {

            switch (event.button) {

                case 0: this.moveState.forward = 0; break;
                case 2: this.moveState.back = 0; break;

            }
            if (!this.flying)
                this.updateMovementVector();

        }

        this.updateRotationVector();

    };
    this.getDirection = function () {
        return this.moveVector;
    }
    this.getPosition = function () {
        return this.object.position;
    }
    this.getNextPosition = function () {
        return this.object.position.clone().add(this.moveVector.clone().multiplyScalar(this.moveMult));
    }
    this.getNextRotation = function () {

        this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
        var qat = this.object.quaternion.clone();
        qat.multiply(this.tmpQuaternion);
        this.tmpRot.setFromQuaternion(this.object.quaternion, this.object.rotation.order);
        return this.tmpRot;
    }
    this.compute = function (delta) {
        var moveMult, rotMult;
        if (this.flying) {

            var direction = this.moveState.forward + -this.moveState.back;
            this.currentSpeed = this.currentSpeed + (direction * this.acceleration);// this.movementSpeed
            this.currentSpeed = Math.max(-this.movementSpeed, Math.min(this.movementSpeed, (this.currentSpeed)));

            moveMult = delta * this.currentSpeed;
            this.updateFlyingVector(moveMult);
            rotMult = delta * this.rollSpeed;
        }
        else {
            if (this.useAcceleration) {
                this.currentSpeed = this.currentSpeed + (this.moveState.accelerate * this.acceleration) + (this.moveState.decelerate * -this.acceleration);// this.movementSpeed
                this.currentSpeed = Math.max(-this.movementSpeed, Math.min(this.movementSpeed, (this.currentSpeed)));
                moveMult = delta * this.currentSpeed;
                console.log(this.currentSpeed);
                this.moveVector.add(this.moveVector.clone().normalize().multiplyScalar(moveMult));
            }
            else {
                moveMult = delta * this.movementSpeed;
            }
            rotMult = delta * this.rollSpeed;
        }
        this.rotMult = rotMult;
        this.moveMult = moveMult;
    }
    this.update = function (delta) {
        var time = Date.now();
        var delta = (time - prevTime) / 10;
        this.compute(delta);
        var rotMult = this.rotMult;
        var moveMult = this.moveMult;

        if (this.flying) {
            this.object.translateX(this.moveVector.x);
            this.object.translateY(this.moveVector.y);
            this.object.translateZ(this.moveVector.z);
        }
        else {
            this.object.translateX(this.moveVector.x * moveMult);
            this.object.translateY(this.moveVector.y * moveMult);
            this.object.translateZ(this.moveVector.z * moveMult);
        }
        this.tmpQuaternion.set(this.rotationVector.x * rotMult, this.rotationVector.y * rotMult, this.rotationVector.z * rotMult, 1).normalize();
        this.object.quaternion.multiply(this.tmpQuaternion);

        // expose the rotation vector for convenience
        this.object.rotation.setFromQuaternion(this.object.quaternion, this.object.rotation.order);
        prevTime = time;

    };

    var lookAtVector = new THREE.Vector3(0, 0, -1);

    this.updateFlyingVector = function (amount) {

        var forward = (this.moveState.forward || (this.autoForward && !this.moveState.back)) ? 1 : 0;
        if (this.flying) {
            lookAtVector.applyQuaternion(this.object.quaternion);
            lookAtVector.normalize();
        }
        if (amount)
            this.moveVector.add(lookAtVector.multiplyScalar(amount));

        // this.moveVector.x = (-this.moveState.left + this.moveState.right);
        // this.moveVector.y = (-this.moveState.down + this.moveState.up);
        // this.moveVector.z = (-forward + this.moveState.back);
        //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

    };

    this.updateMovementVector = function () {

        var forward = (this.moveState.forward || (this.autoForward && !this.moveState.back)) ? 1 : 0;
        if (this.flying) {
            lookAtVector.applyQuaternion(this.object.quaternion);
            lookAtVector.normalize();
        }


        this.moveVector.x = (-this.moveState.left + this.moveState.right);
        this.moveVector.y = (-this.moveState.down + this.moveState.up);
        this.moveVector.z = (-forward + this.moveState.back);
        //console.log( 'move:', [ this.moveVector.x, this.moveVector.y, this.moveVector.z ] );

    };


    this.updateRotationVector = function () {

        this.rotationVector.x = (-this.moveState.pitchDown + this.moveState.pitchUp);
        this.rotationVector.y = (-this.moveState.yawRight + this.moveState.yawLeft);
        this.rotationVector.z = (-this.moveState.rollRight + this.moveState.rollLeft);

        //console.log( 'rotate:', [ this.rotationVector.x, this.rotationVector.y, this.rotationVector.z ] );

    };

    this.getContainerDimensions = function () {

        if (domElement != document) {

            return {
                size: [domElement.offsetWidth, domElement.offsetHeight],
                offset: [domElement.offsetLeft, domElement.offsetTop]
            };

        } else {

            return {
                size: [window.innerWidth, window.innerHeight],
                offset: [0, 0]
            };

        }

    };



    function bind(scope, fn) {
        return fn.bind(scope);
        // return function () {

        //     fn.apply(scope, arguments);

        // };

    };


    this.domElement.addEventListener('contextmenu', function (event) { event.preventDefault(); }, false);
    if (opts.autoPilot) {
    }
    else {
        this.domElement.addEventListener('mousemove', bind(this, this.mousemove), false);
        this.domElement.addEventListener('mousedown', bind(this, this.mousedown), false);
        this.domElement.addEventListener('mouseup', bind(this, this.mouseup), false);
        this.domElement.addEventListener('mouseout', bind(this, this.mouseout), false);

        this.domElement.addEventListener('keydown', bind(this, this.keydown), false);
        this.domElement.addEventListener('keyup', bind(this, this.keyup), false);
    }
    this.updateMovementVector();
    this.updateRotationVector();
};