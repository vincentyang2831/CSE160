class Cube{
    constructor(){
        this.type = "cube";
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4();
        this.textureNum = -2;

        // this.cubeVert32 = new Float32Array([
        //   0,0,0, 1,1,0, 1,0,0,
        //   0,0,0, 0,1,0, 1,1,0,
        //   0,1,0, 0,1,1, 1,1,1,
        //   0,1,0, 1,1,1, 1,1,0,
        //   0,0,1, 1,1,1, 1,0,1,
        //   0,0,1, 0,1,1, 1,1,1,
        //   0,0,0, 1,0,1, 1,0,0,
        //   0,0,0, 0,0,1, 1,0,1,
        //   0,0,0, 0,1,1, 0,0,1,
        //   0,0,0, 0,1,0, 0,1,1,
        //   1,0,0, 1,1,1, 1,0,1,
        //   1,0,0, 1,1,0, 1,1,1
        // ]);

        // this.cubeVerts=[
        //   0,0,0, 1,1,0, 1,0,0,
        //   0,0,0, 0,1,0, 1,1,0,
        //   0,1,0, 0,1,1, 1,1,1,
        //   0,1,0, 1,1,1, 1,1,0,
        //   0,0,1, 1,1,1, 1,0,1,
        //   0,0,1, 0,1,1, 1,1,1,
        //   0,0,0, 1,0,1, 1,0,0,
        //   0,0,0, 0,0,1, 1,0,1,
        //   0,0,0, 0,1,1, 0,0,1,
        //   0,0,0, 0,1,0, 0,1,1,
        //   1,0,0, 1,1,1, 1,0,1,
        //   1,0,0, 1,1,0, 1,1,1
        // ];

        // this.cubeUV32 = new Float32Array([
        //   0,0, 1,1, 1,0,
        //   0,0, 0,1, 1,1,
        //   0,0, 0,1, 1,1,
        //   0,0, 1,1, 1,0,
        //   1,0, 0,1, 0,0,
        //   1,0, 1,1, 0,1,
        //   0,1, 1,0, 1,1,
        //   0,1, 0,0, 1,0,
        //   1,0, 0,1, 0,0,
        //   1,0, 1,1, 0,1,
        //   0,0, 1,1, 1,0,
        //   0,0, 0,1, 1,1
        // ]) ; 

        // this.cubeUV = [
        //   0,0, 1,1, 1,0,
        //   0,0, 0,1, 1,1,
        //   0,0, 0,1, 1,1,
        //   0,0, 1,1, 1,0,
        //   1,0, 0,1, 0,0,
        //   1,0, 1,1, 0,1,
        //   0,1, 1,0, 1,1,
        //   0,1, 0,0, 1,0,
        //   1,0, 0,1, 0,0,
        //   1,0, 1,1, 0,1,
        //   0,0, 1,1, 1,0,
        //   0,0, 0,1, 1,1
        // ];
      }
    
      render() {
        // var xy = this.position;
        var rgba = this.color;
        // var size = this.size;
        // var segments = this.segments

        //pass the texture number
        gl.uniform1i(u_whichTexture, this.textureNum);
        // console.log("u_whichTexture is: ", u_whichTexture);
  
        // Pass the color of a point to a u_FragColor var
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

  
        // Pass the matrix to u_ModelMatrix attrib
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Front of cube
        drawTriangle3DUV( [0,0,0, 1,1,0, 1,0,0], [0,0, 1,1, 1,0]);
        drawTriangle3DUV( [0,0,0, 0,1,0, 1,1,0], [0,0, 0,1, 1,1]);

        // Pass the color of a point to a u_FragColor var
        // gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);

        //draw top of cube
        drawTriangle3DUV( [0,1,0, 0,1,1, 1,1,1], [0,0, 0,1, 1,1]);
        drawTriangle3DUV( [0,1,0, 1,1,1, 1,1,0], [0,0, 1,1, 1,0]);

        // Pass the color of a point to a u_FragColor var
        // gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

        // Back of cube
        drawTriangle3DUV([0,0,1, 1,1,1, 1,0,1], [1,0, 0,1, 0,0]);
        drawTriangle3DUV([0,0,1, 0,1,1, 1,1,1], [1,0, 1,1, 0,1]);

        // Pass the color of a point to a u_FragColor var
        // gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
        // Bottom of cube
        drawTriangle3DUV([0,0,0, 1,0,1, 1,0,0], [0,1, 1,0, 1,1]);
        drawTriangle3DUV([0,0,0, 0,0,1, 1,0,1], [0,1, 0,0, 1,0]);

        // Pass the color of a point to a u_FragColor var
        // gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);

        // Left side of cube
        drawTriangle3DUV([0,0,0, 0,1,1, 0,0,1],[1,0, 0,1, 0,0]);
        drawTriangle3DUV([0,0,0, 0,1,0, 0,1,1],[1,0, 1,1, 0,1]);

        // Right side of cube
        drawTriangle3DUV([1,0,0, 1,1,1, 1,0,1], [0,0, 1,1, 1,0]);
        drawTriangle3DUV([1,0,0, 1,1,0, 1,1,1], [0,0, 0,1, 1,1]);
    }

    renderFast() {
      // var xy = this.position;
      var rgba = this.color;
      // var size = this.size;
      // var segments = this.segments

      //pass the texture number
      gl.uniform1i(u_whichTexture, this.textureNum);
      // console.log("u_whichTexture is: ", u_whichTexture);

      // Pass the color of a point to a u_FragColor var
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);


      // Pass the matrix to u_ModelMatrix attrib
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      var cubeVert32 = new Float32Array([
        0,0,0, 1,1,0, 1,0,0,    //front
        0,0,0, 0,1,0, 1,1,0,    //front 
        0,1,0, 0,1,1, 1,1,1,    //top
        0,1,0, 1,1,1, 1,1,0,    //top
        0,0,1, 1,1,1, 1,0,1,    //back
        0,0,1, 0,1,1, 1,1,1,    //back
        0,0,0, 1,0,1, 1,0,0,    //bottom
        0,0,0, 0,0,1, 1,0,1,    //bottom
        0,0,0, 0,1,1, 0,0,1,    //left
        0,0,0, 0,1,0, 0,1,1,    //left 
        1,0,0, 1,1,1, 1,0,1,    //right
        1,0,0, 1,1,0, 1,1,1     //right
      ]);

      var cubeUV32 = new Float32Array([
        0,0, 1,1, 1,0,
        0,0, 0,1, 1,1,
        0,0, 0,1, 1,1,
        0,0, 1,1, 1,0,
        1,0, 0,1, 0,0,
        1,0, 1,1, 0,1,
        0,1, 1,0, 1,1,
        0,1, 0,0, 1,0,
        1,0, 0,1, 0,0,
        1,0, 1,1, 0,1,
        0,0, 1,1, 1,0,
        0,0, 0,1, 1,1
      ]) ; 

      var cubeNormals = new Float32Array([
        0,0,-1, 0,0,-1, 0,0,-1,      //front
        0,0,-1, 0,0,-1, 0,0,-1,      //front
        0,1,0, 0,1,0, 0,1,0,         //top
        0,1,0, 0,1,0, 0,1,0,         //top
        0,0,1, 0,0,1, 0,0,1,         //back
        0,0,1, 0,0,1, 0,0,1,         //back
        0,-1,0, 0,-1,0, 0,-1,0,      //bottom
        0,-1,0, 0,-1,0, 0,-1,0,      //bottom
        -1,0,0, -1,0,0, -1,0,0,      //left
        -1,0,0, -1,0,0, -1,0,0,      //left
        1,0,0, 1,0,0, 1,0,0,         //right
        1,0,0, 1,0,0, 1,0,0         //right
      ])


      drawTriangle3DUVNormal(cubeVert32, cubeUV32, cubeNormals);
  }
}
