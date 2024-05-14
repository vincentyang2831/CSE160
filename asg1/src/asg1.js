// Based off ColoredPoint.js (c) 2012 matsuda, and instructional videos from Professor Davis
// Vertex shader program
var VSHADER_SOURCE =`
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    //gl_PointSize = 20.0;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE =`
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

  // CONSTANTS
  const SQUARE = 0;
  const TRIANGLE = 1;
  const CIRCLE = 2;

  // Global Variables
  let canvas;
  let gl;
  let a_Position;
  let u_FragColor;
  let g_selectedColor = [1.0, 0.0, 0.0, 1.0];
  let g_selectedSize = 5;
  let u_Size;
  let g_selectedType = SQUARE;
  let g_selectedSegmentCount = 10;

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

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  // Get the storage location of u_Size
  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }

}

function addActionsForHtmlUI(){

  //button events
  // document.getElementById('green').onclick         = function() { g_selectedColor = [0.0, 1.0, 0.0, 1.0]; };
  // document.getElementById('red').onclick           = function() { g_selectedColor = [1.0, 0.0, 0.0, 1.0]; };
  document.getElementById('clearButton').onclick   = function() { g_shapesList = []; renderAllShapes(); };
  document.getElementById('myImage').onclick   = function() { myImage(); };


  document.getElementById('squaresButton').onclick = function() {g_selectedType = SQUARE};
  document.getElementById('triangleButton').onclick = function() {g_selectedType = TRIANGLE};
  document.getElementById('circleButton').onclick = function() {g_selectedType = CIRCLE};


  // Color slider events
  document.getElementById('redSlide').addEventListener('mouseup', function() {g_selectedColor[0] = this.value / 100; } );
  document.getElementById('greenSlide').addEventListener('mouseup', function() {g_selectedColor[1] = this.value / 100; } );
  document.getElementById('blueSlide').addEventListener('mouseup', function() {g_selectedColor[2] = this.value / 100; } );
  
  // Size Slider events
  document.getElementById('sizeSlide').addEventListener('mouseup', function() {g_selectedSize = this.value; } );
  document.getElementById('segCount').addEventListener('mouseup', function() {g_selectedSegmentCount = this.value; } );



}

function main() {
  // set up canvas
  setupWebGL();

  //set up GLSL shader programs and connect GLSL vars
  connectVariablesToGLSL();

  //set up actions for HTML UI elements
  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = function(ev) {if (ev.buttons == 1) {click(ev)} };

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}



g_shapesList = [];

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


function renderAllShapes(){
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  // var len = g_points.length;
  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }

}



function myImage(){


  //clear all shapes
  g_shapesList = [];
  renderAllShapes();
  let point;
  // //top of bottle
  // for(var i = 0; i < 10; i++){
  //   point = new Point();
  //   point.position = [-.25+(i *.05), .55];

  //   if(i < 5){
  //     point.color = [1.0, 0.0, 0.0, 1.0];
  //   }else{
  //     point.color = [0.0, 1.0 , 0.0, 1.0];
  //   }
  //   point.size = 10;
  //   g_shapesList.push(point);
  // }
  // // lower bottle section
  // for(var i = 0; i < 8; i++){
  //   point = new Point();
  //   point.position = [-.2+(i *.05), .5];

  //   if(i < 4){
  //     point.color = [1.0, 0.0, 0.0, 1.0];
  //   }else{
  //     point.color = [0.0, 1.0 , 0.0, 1.0];
  //   }
  //   point.size = 10;
  //   g_shapesList.push(point);
  // }
  // //last tier of bottle
  // for(var i = 0; i < 6; i++){
  //   point = new Point();
  //   point.position = [-.15+(i *.05), .45];

  //   if(i < 3){
  //     point.color = [1.0, 0.0, 0.0, 1.0];
  //   }else{
  //     point.color = [0.0, 1.0 , 0.0, 1.0];
  //   }
  //   point.size = 10;
  //   g_shapesList.push(point);
  // }

  // //left bottle side
  // for(var i = 0; i < 100; i++){
  //   point = new Point();
  //   point.position = [-.15-(i *.002), .42- (i * .008)];
  //   point.color = [1.0, 1.0 , 1.0, 1.0];
  //   point.size = 2;
  //   g_shapesList.push(point);
  // }

  // //right bottle side
  // for(var i = 0; i < 100; i++){
  //   point = new Point();
  //   point.position = [.1+(i *.002), .42-(i * .008)];
  //   point.color = [1.0, 1.0 , 1.0, 1.0];
  //   point.size = 2;
  //   g_shapesList.push(point);
  // }

  // //bottom of bottle
  // for(var i = 0; i < 325; i++){
  //   point = new Point();
  //   point.position = [-.35+(i *.002), -.372];
  //   point.color = [1.0, 1.0 , 1.0, 1.0];
  //   point.size = 2;
  //   g_shapesList.push(point);
  // }

  // //mountain right side
  // point = new Triangle();
  // point.position = [0.0,0.018];
  // point.color = [1.0, 0.0 , 0.0, 1.0];
  // point.size = 28;
  // g_shapesList.push(point);
  // //mountain left side
  // point = new Triangle();
  // point.position = [.0 ,0.024, -0.149 , 0.024, .0, 0.155];
  // point.color = [0.0, 1.0 , 0.0, 1.0];
  // point.size = 25;
  // g_shapesList.push(point);
  

  // point = new Triangle;
  // point.position = [.0, 0.0,   -0.25, -0.25,   0.25, -0.25];
  // point.color = [0.0, 0.0 , 1.0, 1.0];
  // point.size = 25;
  // g_shapesList.push(point);
  

  // point = new Triangle;
  // point.position = [.0, 0.0,   -0.15, -0.15,   0.15, -0.15];
  // point.color = [1.0, 1.0 , 1.0, 1.0];
  // point.size = 25;
  // g_shapesList.push(point);

  point = new Triangle;
  point.position = [1,1, -1, 0, 1,-1];
  point.color = [1.0, 1.0 , 1.0, 1.0];
  point.size = 25;
  g_shapesList.push(point);


  renderAllShapes();
}