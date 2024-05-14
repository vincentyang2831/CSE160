// DrawRectangle.js
function main(){
    // Retrieve <canvas> element
    canvas = document.getElementById('example');
    if(!canvas){
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG
    ctx = canvas.getContext('2d');

    // Draw blue rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set a black color
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

    v1 = new Vector3([2.25, 2.25, 0]);

    drawVector(v1,"red");

}

function drawVector(v,color){
    ctx.strokeStyle = color;

    //cx and cy are center of the canvas
    let cx = canvas.width/2;
    let cy = canvas.height/2;

    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx + v.elements[0] * 20, cy - v.elements[1] * 20);
    ctx.stroke();
}

function handleDrawEvent(){
    //clear canvas and set to black rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //get values of v1 and v2
    let v1 = new Vector3([document.getElementById("v1x").value, document.getElementById("v1y").value, 0]) 
    let v2 = new Vector3([document.getElementById("v2x").value, document.getElementById("v2y").value, 0]) 

    //draw v1 and v2
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

function handleDrawOperationEvent(){
    //clear canvas and set to black rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //get values of v1 and v2
    let v1 = new Vector3([document.getElementById("v1x").value, document.getElementById("v1y").value, 0]) 
    let v2 = new Vector3([document.getElementById("v2x").value, document.getElementById("v2y").value, 0]) 

    var getOpt = document.getElementById("operation").value;

    if(getOpt == "add"){
        var v3 = new Vector3;
        v3.set(v1);
        v3.add(v2);
        drawVector(v1, "red");
        drawVector(v2, "blue");
        drawVector(v3, "green");  

    }else if(getOpt == "sub"){
        var v3 = new Vector3;
        v3.set(v1);
        v3.sub(v2);
        drawVector(v1, "red");
        drawVector(v2, "blue");
        drawVector(v3, "green");

    }else if(getOpt == "mul"){
        var v3 = new Vector3;
        var v4 = new Vector3;
        v3.set(v1);
        v4.set(v2);
        v3.mul(document.getElementById("scalar").value);
        v4.mul(document.getElementById("scalar").value);
        drawVector(v1, "red");
        drawVector(v2, "blue");
        drawVector(v3, "green");
        drawVector(v4, "green");

    }else if(getOpt == "div"){
        var v3 = new Vector3;
        var v4 = new Vector3;
        v3.set(v1);
        v4.set(v2);

        v3.div(document.getElementById("scalar").value);
        v4.div(document.getElementById("scalar").value);

        drawVector(v1, "red");
        drawVector(v2, "blue");
        drawVector(v3, "green");
        drawVector(v4, "green");

    }else if(getOpt == "magnitude"){
        var mag1 = v1.magnitude();
        var mag2 = v2.magnitude();

        drawVector(v1, "red");
        drawVector(v2, "blue");

        console.log("Magnitude V1: ", mag1);
        console.log("Magnitude V2: ", mag2);

    }else if(getOpt == "normalize"){
        var v3 = new Vector3;
        var v4 = new Vector3;
        v3.set(v1);
        v4.set(v2);

        v3.normalize();
        v4.normalize();

        drawVector(v1, "red");
        drawVector(v2, "blue");
        drawVector(v3, "green");
        drawVector(v4, "green");

    }else if(getOpt == "dot"){
        drawVector(v1, "red");
        drawVector(v2, "blue");
        angleBetween(v1,v2);

    }else if(getOpt == "area"){
        drawVector(v1, "red");
        drawVector(v2, "blue");
        areaTriangle(v1,v2);
    }
}

function angleBetween(v1,v2){
    cosAlpha = Vector3.dot(v1,v2) / (v1.magnitude() * v2.magnitude());

    alphaRadians = Math.acos(cosAlpha);

    alphaDegrees = alphaRadians * (180 / Math.PI);

    console.log("Angle: ", alphaDegrees);
}

function areaTriangle(v1,v2){
    v3 = Vector3.cross(v1,v2);
    area = v3.magnitude();
    
    console.log("Area: ", area/2);
}