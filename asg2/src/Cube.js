class Cube{
    constructor(){
        this.type = "cube";
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4();
      }
    
      render() {
        // var xy = this.position;
        var rgba = this.color;
        // var size = this.size;
        // var segments = this.segments
  
        // Pass the color of a point to a u_FragColor var
        gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

  
        // Pass the matrix to u_ModelMatrix attrib
        gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

        // Front of cube
        drawTriangle3D( [0,0,0, 1,1,0, 1,0,0]);
        drawTriangle3D( [0,0,0, 0,1,0, 1,1,0]);

        // Pass the color of a point to a u_FragColor var
        gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);

        //draw top of cube
        drawTriangle3D( [0,1,0, 0,1,1, 1,1,1]);
        drawTriangle3D( [0,1,0, 1,1,1, 1,1,0]);

        // Pass the color of a point to a u_FragColor var
        gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);

        // Back of cube
        drawTriangle3D([0,0,1, 1,1,1, 1,0,1]);
        drawTriangle3D([0,0,1, 0,1,1, 1,1,1]);

        // Pass the color of a point to a u_FragColor var
        gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
        // Bottom of cube
        drawTriangle3D([0,0,0, 1,0,0, 1,0,1]);
        drawTriangle3D([0,0,0, 0,0,1, 1,0,1]);

        // Pass the color of a point to a u_FragColor var
        gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);

        // Left side of cube
        drawTriangle3D([0,0,0, 0,1,0, 0,1,1]);
        drawTriangle3D([0,0,0, 0,0,1, 0,1,1]);

        // Right side of cube
        drawTriangle3D([1,0,0, 1,1,0, 1,1,1]);
        drawTriangle3D([1,0,0, 1,0,1, 1,1,1]);

    }
}
