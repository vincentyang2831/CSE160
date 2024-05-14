class Camera{
    constructor(){
        this.type = "camera";
        this.fov = 55;
        this.eye = new Vector3([0,0,0]);
        this.at = new Vector3([0,0,-1]);
        this.up = new Vector3 ([0,1,0]) ;
        this.viewMatrix = new Matrix4();
        this.projectionMatrix = new Matrix4();

        this.viewMatrix.setLookAt(
            this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
            this.at.elements[0],  this.at.elements[1],  this.at.elements[2],
            this.up.elements[0],  this.up.elements[1],  this.up.elements[2]
        )

        this.projectionMatrix.setPerspective(this.fov, canvas.width/canvas.height, 0.1, 1000);
    }

    moveForward(){
        var f = new Vector3;
        f.set(this.at);
        f.sub(this.eye);
        f.normalize();
        this.eye = this.eye.add(f);
        this.at = this.at.add(f);
    }

    moveBackwards(){
        var f = new Vector3;
        f.set(this.at);
        f.sub(this.eye);
        this.eye = this.eye.sub(f);
        this.at = this.at.sub(f);
    }

    moveLeft(){
        var f = new Vector3;
        f.set(this.at);
        f.sub(this.eye);
        f.normalize();
        var s = Vector3.cross(this.up, f);
        this.at.add(s);
        this.eye.add(s);
    }

    moveRight(){
        var f = new Vector3;
        f.set(this.at);
        f.sub(this.eye);
        f.normalize();
        var s = Vector3.cross(f,this.up);
        this.at.add(s);
        this.eye.add(s);
    }

    panLeft(alpha){
        var f = new Vector3;
        f.set(this.at);
        f.sub(this.eye);
        let rotMatrix = new Matrix4(); //create new matrix
        alpha *= 1
        rotMatrix.setRotate(1* alpha, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        let fprime = rotMatrix.multiplyVector3(f);
        this.at = fprime.add(this.eye)
    
    }

    panRight(alpha){
        var f = new Vector3;
        f.set(this.at);
        f.sub(this.eye);
        let rotMatrix = new Matrix4(); //create new matrix
        alpha *= -1
        rotMatrix.setRotate(1*alpha, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        let fprime = rotMatrix.multiplyVector3(f);
        this.at = fprime.add(this.eye)

    }

    panUp(alpha){
        this.at.elements[1] += alpha;
    }


    panDown(alpha){
        this.at.elements[1] -= alpha;
    }

    resetFOV(){
        this.projectionMatrix.setPerspective(this.fov, canvas.width/canvas.height, 0.1, 1000);
    }

}