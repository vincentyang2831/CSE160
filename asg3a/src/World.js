// Based off ColoredPoint.js (c) 2012 matsuda, and instructional videos from Professor Davis

// Vertex shader program
var VSHADER_SOURCE =`
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    v_UV = a_UV;
  }`

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler2;
  uniform sampler2D u_Sampler3;
  uniform int u_whichTexture;
  void main() {
    
    if(u_whichTexture == -2) {
      gl_FragColor = u_FragColor;                 //use color

    } else if(u_whichTexture == -1) {
      gl_FragColor = vec4(v_UV,1.0,1.0);          //use uv debug color

    } else if (u_whichTexture == 0) {
      gl_FragColor = texture2D(u_Sampler0, v_UV); // use texture0 (sky)

    } else if(u_whichTexture == 1){
      gl_FragColor = texture2D(u_Sampler1, v_UV); // use texture1(brick)

    } else if (u_whichTexture == 2){
      gl_FragColor = texture2D(u_Sampler2, v_UV); // use texture1(tiger stripes)

    } else if (u_whichTexture == 3){
      gl_FragColor = texture2D(u_Sampler3, v_UV); // use texture1(tiger king)

    }else{
      gl_FragColor = vec4(1,.2,.2,1);
    }

  }`

  // CONSTANTS
  const SQUARE = 0;
  const TRIANGLE = 1;
  const CIRCLE = 2;

  // Global Variables
  let canvas;
  let gl;
  let a_Position;
  let a_UV;
  let u_FragColor;
  let u_Size;
  let u_ModelMatrix;
  let u_ProjectionMatrix;
  let u_ViewMatrix;
  let u_GlobalRotateMatrix;
  let u_Sampler0;
  let u_Sampler1;
  let u_Sampler2;
  let u_Sampler3;
  let u_whichTexture;


  //BLOCKY ANIMAL STUFF--------
  let g_globalAngleX = 0;
  let g_globalAngleY = 0;
  let g_tailSlide = 0;
  let g_tailAnimate = false;
  let g_headSlide = 0;
  let g_headAnimate = false;
  let g_walkMode = false;
  let g_flLegAngle = 0;
  let g_frLegAngle = 0;
  let g_rlLegAngle = 0;
  let g_rrLegAngle = 0;
  let runModeBool = false;
  let g_selectedType = SQUARE;

  let g_lastX = null;
  let g_lastY= null;
  //---------------------------

function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  // gl = getWebGLContext(canvas);
  gl = canvas.getContext("webgl", {preserveDrwaingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

  gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // // Get the storage location of u_Size
  // u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  // if (!u_Size) {
  //   console.log('Failed to get the storage location of u_Size');
  //   return;
  // }

  // Get storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if(!u_ModelMatrix){
    console.log('Failed to get storage location of u_ModelMatrix');
    return;
  }

  // Get storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(gl.program, 'u_GlobalRotateMatrix');
  if(!u_GlobalRotateMatrix){
    console.log('Failed to get storage location of u_GlobalRotateMatrix');
    return;
  }

  // Get storage location of u_ProjectionMatrix
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if(!u_ProjectionMatrix){
    console.log('Failed to get storage location of u_ProjectionMatrix');
    return;
  }

  // Get storage location of u_ProjectionMatrix
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if(!u_ViewMatrix){
    console.log('Failed to get storage location of u_ViewMatrix');
    return;
  }

  // Get the storage location of u_Sampler0
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return false;
  }

  // Get the storage location of u_Sampler1
  u_Sampler1 = gl.getUniformLocation(gl.program, 'u_Sampler1');
  if (!u_Sampler1) {
    console.log('Failed to get the storage location of u_Sampler1');
    return false;
  }
  // Get the storage location of u_Sampler2
  u_Sampler2 = gl.getUniformLocation(gl.program, 'u_Sampler2');
  if (!u_Sampler2) {
    console.log('Failed to get the storage location of u_Sampler2');
    return false;
  }  
  
  // Get the storage location of u_Sampler3
  u_Sampler3 = gl.getUniformLocation(gl.program, 'u_Sampler3');
  if (!u_Sampler3) {
    console.log('Failed to get the storage location of u_Sampler3');
    return false;
  }

  // Get the storage location of u_whichTexture
  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if (!u_whichTexture) {
    console.log('Failed to get the storage location of u_whichTexture');
    return false;
  }

  var identityMatrix = new Matrix4();
  gl.uniformMatrix4fv(u_ModelMatrix, false, identityMatrix.elements)

}

function addActionsForHtmlUI(){

  //button events
  document.getElementById('animateTailOn').onclick = function (){g_tailAnimate = true};
  document.getElementById('animateTailOff').onclick = function (){g_tailAnimate = false};
  document.getElementById('animateHeadOn').onclick = function (){g_headAnimate = true};
  document.getElementById('animateHeadOff').onclick = function (){g_headAnimate = false};
  document.getElementById('walkOn').onclick = function (){g_walkMode = true};
  document.getElementById('walkOff').onclick = function (){g_walkMode = false};

  // slider events
  document.getElementById('tailSlide').addEventListener('mousemove', function () {g_tailSlide = this.value; renderAllShapes();} );
  document.getElementById('headSlide').addEventListener('mousemove', function () {g_headSlide = this.value; renderAllShapes();} );
  
  // Size Slider events
  document.getElementById('angleXSlider').addEventListener('mousemove', function() {g_globalAngleX = this.value; renderAllShapes();});
  document.getElementById('angleYSlider').addEventListener('mousemove', function() {g_globalAngleY = this.value; renderAllShapes();});

  //shift event 
  document.addEventListener("click", runMode);

}

function initTextures() {
var image0 = new Image(); // Create an image object
var image1 = new Image(); // Create an image object
var image2 = new Image(); // Create an image object
var image3 = new Image(); // Create an image object
var image4 = new Image(); // Create an image object
var image5 = new Image(); // Create an image object
var image6 = new Image(); // Create an image object
var image7 = new Image(); // Create an image object
var image8 = new Image(); // Create an image object
var image9 = new Image(); // Create an image object
var image10 = new Image(); // Create an image object
var image11 = new Image(); // Create an image object
var image12 = new Image(); // Create an image object
var image13 = new Image(); // Create an image object
var image14 = new Image(); // Create an image object
var image15 = new Image(); // Create an image object



  // Register the event handler to be called on loading an image
  image0.onload = function () {
    sendTextureToTEXTURE(image0, u_Sampler0, 0);
  };
  image1.onload = function () {
    sendTextureToTEXTURE(image1, u_Sampler1, 1);
  };
  image2.onload = function () {
    sendTextureToTEXTURE(image2, u_Sampler2, 2);
  };  
  image3.onload = function () {
    sendTextureToTEXTURE(image3, u_Sampler3, 3);
  };

  // Tell the browser to load an image

  image0.src = "sky.jpg";
  image1.src = "brick1.jpg";
  image2.src = "tiger.png";
  image3.src = "tigerking.png";


  // add more textures later

  return true;
}

function sendTextureToTEXTURE(image, u_Sampler, index) {
  // Create a texture object
  var texture = gl.createTexture();
  if (!texture) {
    console.log("failed to create textured object");
  }


  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable the texture unit 0
  if (index === 0) {
    gl.activeTexture(gl.TEXTURE0);
  } else if (index === 1) {
    gl.activeTexture(gl.TEXTURE1);
  } else if (index === 2) {
    gl.activeTexture(gl.TEXTURE2);
  } else if (index === 3) {
    gl.activeTexture(gl.TEXTURE3);
  }
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  // Set the texture unit 0 to the sample
  gl.uniform1i(u_Sampler, index);

  console.log("Loaded Texture", image);
}


function main() {
  // set up canvas
  setupWebGL();

  //set up GLSL shader programs and connect GLSL vars
  connectVariablesToGLSL();

  //set up actions for HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  // canvas.onmousedown = click;
  // canvas.onmousemove = function(ev) {if (ev.buttons == 1) {click(ev)} };

  initTextures();

  // Specify the color for clearing <canvas>
  gl.clearColor(0, 0, 0, 1.0);

  // Clear <canvas>
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // renderAllShapes();
  requestAnimationFrame(tick);
}


var g_startTime = performance.now()/1000.0;
var g_seconds = performance.now/1000.0 - g_startTime;

function click(ev) {

  // Extract the event click and return it in WebGL coords
  [x,y] = convertCoordinateEventsToGL(ev);

  // create and store the new point
  let point;
  if(g_selectedType == SQUARE){
    point = new Point();
  }else if (g_selectedType == TRIANGLE){
    point = new Triangle();
  }else if (g_selectedType == CIRCLE){
    point = new Circle();
  }
  point.position = [x,y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  point.segments = g_selectedSegmentCount;
  g_shapesList.push(point);

 renderAllShapes();
}

function convertCoordinateEventsToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}

function updateAnimationAngles(){
  if(g_tailAnimate){
    g_tailSlide = (15*Math.sin(g_seconds));
  }

  if(g_headAnimate){
    g_headSlide = (10*Math.sin(g_seconds/.5));
  }

  if(g_walkMode){
    let frontAngle = (15*Math.sin(g_seconds));
    g_flLegAngle = frontAngle;
    g_frLegAngle = -frontAngle;
    g_rlLegAngle = frontAngle;
    g_rrLegAngle = -frontAngle;
  }else if(runModeBool){
    let frontAngle = (15*Math.sin(50*g_seconds));
    g_flLegAngle = frontAngle;
    g_frLegAngle = frontAngle;
    g_rlLegAngle = -frontAngle;
    g_rrLegAngle = -frontAngle;
  }else{
    g_flLegAngle = 0;
    g_frLegAngle = 0;
    g_rlLegAngle = 0;
    g_rrLegAngle = 0;
  }

}

function renderAllShapes(){

  var startTime = performance.now();

  //pass projection matrix
  var projMatrix = new Matrix4();
  projMatrix.setPerspective(17, 1*canvas.width/canvas.height, 1, 50);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMatrix.elements);

  //pass the view matrix
  var viewMat = new Matrix4();
  viewMat.setLookAt(1,0,-4, 0,0,0, 0,1,0);
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);


  var globalRotMatX = new Matrix4().rotate(g_globalAngleX,0,1,0).rotate(g_globalAngleY,1,0,0)
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMatX.elements);


  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.clear(gl.COLOR_BUFFER_BIT);

  //draw ground
  var ground = new Cube();
  ground.textureNum = 1;
  ground.matrix.translate(0, -.75, 0);
  ground.matrix.scale(10,0,10);
  ground.matrix.translate(-.5,0,-0.5);
  ground.render();

  //draw sky
  var sky = new Cube();
  sky.textureNum = 0;
  sky.matrix.scale(50,50,50);
  sky.matrix.translate(-.5,-.5,-.5);
  sky.render();


  //draw a body cube
  var body = new Cube();
  body.textureNum = 2;
  body.color = [.255,.148,.112,1];
  body.matrix.translate(-.2, -.2, 0);
  // body.matrix.rotate(1,1,0,0);
  body.matrix.scale(0.5, .3, 0.75);
  body.render();

  //face
  var face = new Cube();
  face.textureNum = 3;
  face.color = [.255,.148,.112,1];
  face.matrix = body.matrix;
  face.matrix.translate(-.15,.2,-.25)
  face.matrix.scale(1.25,1.45,.5)
  face.matrix.rotate(-g_headSlide,0,0,1);
  face.render();

  //left eye
  var eyeL = new Cube();
  eyeL.color = [0,1,0,1];
  eyeL.matrix = face.matrix;
  eyeL.matrix.translate(.20,.6,-.12)
  eyeL.matrix.scale(.1,.1,.15);
  eyeL.render();

  //right eye
  var eyeR = new Cube();
  eyeR.color = [0,1,0,1];
  eyeR.matrix = eyeL.matrix;
  eyeR.matrix.translate(5,0,-.12)
  eyeR.render();

  //left ear
  var earL = new Prism();
  earL.color = [1,1,1,1];
  earL.matrix = face.matrix;
  earL.matrix.scale(4.5,4.5,4.5);
  earL.matrix.translate(-1.65,.85,.25);
  earL.render();

  //right ear
  var earR = new Prism();
  earR.color = [.255,.148,.112,1];
  earR.matrix = earL.matrix;
  earR.matrix.translate(1.5,0,0);
  earR.render();

  //tail
  var tail = new Cube();
  tail.color = [.255,.148,.112,1];
  tail.textureNum = 2;
  tail.matrix.translate(-.09,0, .75);
  tail.matrix.rotate(-50,1,0,0)
  tail.matrix.scale(.25,.15,.35);
  tail.matrix.rotate(g_tailSlide,0,0);
  tail.render();

  //front left leg
  var flLeg = new Cube();
  flLeg.color = [.255,.148,.112,1];
  flLeg.textureNum = 2;
  flLeg.matrix.translate(-.25,-.05,.25)
  flLeg.matrix.scale(.15,.45,.20);
  flLeg.matrix.rotate(1,1,1,0).rotate(180,1,0,0);
  flLeg.matrix.rotate(1,1,1,0).rotate(g_flLegAngle,1,0,0);
  flLeg.render();

  //front right leg
  var frLeg = new Cube();
  frLeg.color = [.255,.148,.112,1];
  frLeg.textureNum = 2;
  frLeg.matrix.translate(.2,-.05,.25)
  frLeg.matrix.scale(.15,.45,.20);
  frLeg.matrix.rotate(1,1,1,0).rotate(180,1,0,0);
  frLeg.matrix.rotate(1,1,1,0).rotate(g_frLegAngle,1,0,0);
  frLeg.render();

  //rear left leg
  var rlLeg = new Cube();
  rlLeg.color = [.255,.148,.112,1];
  rlLeg.textureNum = 2;
  rlLeg.matrix.translate(-.25,-.05,.60)
  rlLeg.matrix.rotate(1,1,1,0).rotate(180,1,0,0);
  rlLeg.matrix.rotate(1,1,1,0).rotate(g_rlLegAngle,1,0,0);
  rlLeg.matrix.scale(.15,.45,.15);
  rlLeg.render();


  //rear right leg
  var rrLeg = new Cube();
  rrLeg.color = [.255,.148,.112,1];
  rrLeg.textureNum = 2;
  rrLeg.matrix.translate(.2,-.05,.60)
  rrLeg.matrix.rotate(1,1,1,0).rotate(180,1,0,0);
  rrLeg.matrix.rotate(1,1,1,0).rotate(g_rrLegAngle,1,0,0);
  rrLeg.matrix.scale(.15,.45,.15);
  rrLeg.render();

  var duration = performance.now() - startTime;
  sendTextToHTML(" ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration));

}

function tick(){
  //print some debug info so we know we are running
  g_seconds=performance.now()/1000.0-g_startTime;
  // console.log(performance.now());

  updateAnimationAngles();

  renderAllShapes();

  requestAnimationFrame(tick);
}

function sendTextToHTML(string){
  document.getElementById("perf").innerText = string;
}

function runMode(e){
  if(e.shiftKey){
    runModeBool = !runModeBool;
  }

}