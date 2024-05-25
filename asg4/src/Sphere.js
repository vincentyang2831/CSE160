class Sphere{
    constructor(){
        this.type = "sphere";
        // this.position = [0.0, 0.0, 0.0];
        this.color = [1.0, 1.0, 1.0, 1.0];
        // this.size = 5.0;
        // this.segments = 10;
        this.matrix = new Matrix4();
        this.textureNum = -2;
        this.verts32 = new Float32Array([]);

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

        var d = Math.PI/10;
        var dd = Math.PI/10;

        for (var t=0; t<Math.PI; t+=d){
            for (var r=0; r<(2*Math.PI); r+=d){
                var p1 = [Math.sin(t)*Math.cos(r), Math.sin(t)*Math.sin(r), Math.cos(t)];

                var p2 = [Math.sin(t+dd)*Math.cos(r), Math.sin(t+dd)*Math.sin(r), Math.cos(t+dd)];
                var p3 = [Math.sin(t)*Math.cos(r+dd), Math.sin(t)*Math.sin(r+dd), Math.cos(t)];
                var p4 = [Math.sin(t+dd)*Math.cos(r+dd), Math.sin(t+dd)*Math.sin(r+dd), Math.cos(t+dd)];

                var uv1 = [t/Math.PI, r/(2*Math.PI)];
                var uv2 = [(t+dd)/Math.PI, r/(2*Math.PI)];
                var uv3 = [t/Math.PI, (r+dd)/(2*Math.PI)];
                var uv4 = [(t+dd)/Math.PI, (r+dd)/(2*Math.PI)];

                var v = [];
                var uv = [];

                v=v.concat(p1); uv=uv.concat(uv1);
                v=v.concat(p2); uv=uv.concat(uv2);
                v=v.concat(p4); uv=uv.concat(uv4);

                gl.uniform4f(u_FragColor, 1,1,1,1);
                drawTriangle3DUVNormal(v, uv, v);

                // v=[]; uv=[];
                v=v.concat(p1); uv=uv.concat(uv1);
                v=v.concat(p4); uv=uv.concat(uv4);
                v=v.concat(p3); uv=uv.concat(uv3);

                gl.uniform4f(u_FragColor, 1,0,0,1);
                drawTriangle3DUVNormal(v, uv, v);
            }
        }
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
