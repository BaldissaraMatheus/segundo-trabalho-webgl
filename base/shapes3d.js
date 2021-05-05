const EPS = 1e-6;

class Shape3d{
    constructor(program,gl,color){
      this.VAO;
      this.CoordVBO; // Coordinate VBO
      this.ColorVBO; // Colors VBO
      this.NormalVBO;// Normal VBO
      this.IBO;      // Index Buffer Object
      this.program = program; // Program Shader
      this.gl = gl;    
      this.color = color;
    }


    init_buffers(){

        var gl = this.gl;
  
        // Create VAO
        this.VAO = gl.createVertexArray();
  
        // Bind VAO
        gl.bindVertexArray(this.VAO);
  
        this.coordVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.coordVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
        // Provide instructions to VAO
        gl.vertexAttribPointer(this.program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.aVertexPosition);
  
        this.colorVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW);
        // Provide instructions to VAO
        gl.vertexAttribPointer(this.program.aVertexColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.aVertexColor);

        this.normalVBO = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalVBO);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normals), gl.STATIC_DRAW);
        // Provide instructions to VAO
        gl.vertexAttribPointer(this.program.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.program.aVertexNormal);
  
        this.IBO = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.IBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
  
        // Clean
        gl.bindVertexArray(null);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
    }
}


class MyCube extends Shape3d{
  constructor(program,gl,color){
    super(program,gl,color);

    this.vertices = [
      -1.0, -1.0, -1.0,  //A0
      -1.0, -1.0, -1.0,  //A1
      -1.0, -1.0, -1.0,  //A2
      -1.0, -1.0,  1.0,  //B0  
      -1.0, -1.0,  1.0,  //B1  
      -1.0, -1.0,  1.0,  //B2  
      -1.0, -1.0,  1.0,  //B3  
      -1.0, -1.0,  1.0,  //B4  
      -1.0, -1.0,  1.0,  //B5 
        1.0, -1.0,  1.0,  //C0  
        1.0, -1.0,  1.0,  //C1  
        1.0, -1.0,  1.0,  //C2  
        1.0, -1.0, -1.0,  //D0
        1.0, -1.0, -1.0,  //D1
        1.0, -1.0, -1.0,  //D2
        1.0, -1.0, -1.0,  //D3
        1.0, -1.0, -1.0,  //D4
        1.0, -1.0, -1.0,  //D5
      -1.0,  1.0, -1.0,  //E0
      -1.0,  1.0, -1.0,  //E1
      -1.0,  1.0, -1.0,  //E2
      -1.0,  1.0, -1.0,  //E3
      -1.0,  1.0, -1.0,  //E4
      -1.0,  1.0, -1.0,  //E5
      -1.0,  1.0,  1.0,  //F0
      -1.0,  1.0,  1.0,  //F1
      -1.0,  1.0,  1.0,  //F2
        1.0,  1.0,  1.0,  //G0  
        1.0,  1.0,  1.0,  //G1  
        1.0,  1.0,  1.0,  //G2  
        1.0,  1.0,  1.0,  //G3  
        1.0,  1.0,  1.0,  //G4  
        1.0,  1.0,  1.0,  //G5
        1.0,  1.0, -1.0,  //H0  
        1.0,  1.0, -1.0,  //H1  
        1.0,  1.0, -1.0,  //H2  
      ];

    var i;

    if (color != undefined){
      for (i = 0; i < 8;i++){
        this.colors.push(this.color.r);
        this.colors.push(this.color.g);
        this.colors.push(this.color.b);
      }
    }
    else{      
      this.colors = [
          1.0,  0.0,  0.0,  //A0 - 0
          1.0,  1.0,  0.0,  //A1 - 1
          1.0,  1.0,  1.0,  //A2 - 2
          1.0,  0.0,  0.0,  //B0 - 3 
          1.0,  0.0,  0.0,  //B1 - 4 
          0.0,  1.0,  0.0,  //B2 - 5 
          0.0,  1.0,  0.0,  //B3 - 6 
          1.0,  1.0,  1.0,  //B4 - 7 
          1.0,  1.0,  1.0,  //B5 - 8 
          1.0,  0.0,  0.0,  //C0 - 9 
          0.0,  1.0,  0.0,  //C1 - 10 
          0.0,  0.0,  1.0,  //C2 - 11 
          1.0,  0.0,  0.0,  //D0 - 12
          1.0,  0.0,  0.0,  //D1 - 13
          0.0,  0.0,  1.0,  //D2 - 14
          0.0,  0.0,  1.0,  //D3 - 15
          1.0,  1.0,  0.0,  //D4 - 16
          1.0,  1.0,  0.0,  //D5 - 17
          1.0,  1.0,  0.0,  //E0 - 18
          1.0,  1.0,  0.0,  //E1 - 19
          1.0,  1.0,  1.0,  //E2 - 20
          1.0,  1.0,  1.0,  //E3 - 21
          1.0,  0.0,  1.0,  //E4 - 22
          1.0,  0.0,  1.0,  //E5 - 23
          0.0,  1.0,  0.0,  //F0 - 24
          1.0,  1.0,  1.0,  //F1 - 25
          1.0,  0.0,  1.0,  //F2 - 26
          0.0,  1.0,  0.0,  //G0 - 27   
          0.0,  1.0,  0.0,  //G1 - 28 
          0.0,  0.0,  1.0,  //G2 - 29 
          0.0,  0.0,  1.0,  //G3 - 30 
          1.0,  0.0,  1.0,  //G4 - 31 
          1.0,  0.0,  1.0,  //G5 - 32
          0.0,  0.0,  1.0,  //H0 - 33 
          1.0,  1.0,  0.0,  //H1 - 34 
          1.0,  0.0,  1.0,  //H2 - 35 
      ];
    }

    this.normals = [
      0.0, -1.0,  0.0,  //A0 - 0
      0.0,  0.0, -1.0,  //A1 - 1
      -1.0,  0.0,  0.0,  //A2 - 2
      0.0, -1.0,  0.0,  //B0 - 3 
      0.0, -1.0,  0.0,  //B1 - 4 
      0.0,  0.0,  1.0,  //B2 - 5 
      0.0,  0.0,  1.0,  //B3 - 6 
      -1.0,  0.0,  0.0,  //B4 - 7 
      -1.0,  0.0,  0.0,  //B5 - 8 
      0.0, -1.0,  0.0,  //C0 - 9 
      0.0,  0.0,  1.0,  //C1 - 10 
      1.0,  0.0,  0.0,  //C2 - 11 
      0.0, -1.0,  0.0,  //D0 - 12
      0.0, -1.0,  0.0,  //D1 - 13
      1.0,  0.0,  0.0,  //D2 - 14
      1.0,  0.0,  0.0,  //D3 - 15
      0.0,  0.0, -1.0,  //D4 - 16
      0.0,  0.0, -1.0,  //D5 - 17
      0.0,  0.0, -1.0,  //E0 - 18
      0.0,  0.0, -1.0,  //E1 - 19
      -1.0,  0.0,  0.0,  //E2 - 20
      -1.0,  0.0,  0.0,  //E3 - 21
      0.0,  1.0,  0.0,  //E4 - 22
      0.0,  1.0,  0.0,  //E5 - 23
      0.0,  0.0,  1.0,  //F0 - 24
      -1.0,  0.0,  0.0,  //F1 - 25
      0.0,  1.0,  0.0,  //F2 - 26
      0.0,  0.0,  1.0,  //G0 - 27   
      0.0,  0.0,  1.0,  //G1 - 28 
      1.0,  0.0,  0.0,  //G2 - 29 
      1.0,  0.0,  0.0,  //G3 - 30 
      0.0,  1.0,  0.0,  //G4 - 31 
      0.0,  1.0,  0.0,  //G5 - 32
      1.0,  0.0,  0.0,  //H0 - 33 
      0.0,  0.0, -1.0,  //H1 - 34 
      0.0,  1.0,  0.0,  //H2 - 35 
    ];

    
    this.indicesTriangles = [  
        0, 12,  3, //A0 D0 B0
        4, 13,  9, //B1 D1 C1
        5, 27, 24, //B2 G0 F0
        6, 10, 28, //B3 C1 G1
      11, 14, 29, //C2 D2 G2
      15, 33, 30, //D3 H0 G3
      16, 18, 34, //D4 E0 H1
        1, 17, 19, //A1 D5 E1
        2,  7, 20, //A2 B4 E2
        8, 25, 21, //B5 F1 E3
      22, 26, 31, //E4 F2 G4
      23, 32, 35  //E5 G5 H2
    ];

    this.indicesLines = [];

    var i;  
    for (i = 0; i<this.indicesTriangles.length;i+=3){
      this.indicesLines.push(this.indicesTriangles[i]);
      this.indicesLines.push(this.indicesTriangles[i+1]);
      this.indicesLines.push(this.indicesTriangles[i+1]);
      this.indicesLines.push(this.indicesTriangles[i+2]);
      this.indicesLines.push(this.indicesTriangles[i+2]);
      this.indicesLines.push(this.indicesTriangles[i]);
    }

    this.indicesPoints = [];
    for (i=0;i<Math.floor(this.vertices.length/3.0);i++){
      this.indicesPoints.push(i);
    }

    this.init_buffers();

  }


  draw(renderingMode) {
    var gl = this.gl;

    // Bind VAO
    gl.bindVertexArray(this.VAO);

    // Depending on the rendering mode type, we will draw differently
    switch (renderingMode) {
      case 'TRIANGLES': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesTriangles), gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, this.indicesTriangles.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
      case 'LINES': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesLines), gl.STATIC_DRAW);
        gl.drawElements(gl.LINES, this.indicesLines.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
      case 'POINTS': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesPoints), gl.STATIC_DRAW);
        gl.drawElements(gl.POINTS, this.indicesPoints.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
    }

    // Clean
    gl.bindVertexArray(null);
  }

}

class MyCylinder extends Shape3d{
  constructor(program,gl,radius,length,div_u,div_v,color){
    super(program,gl,color);
    this.div_u = div_u;
    this.div_v = div_v;
    this.length = length;
    this.radius = radius;

    var delta_u = 2*Math.PI/div_u;
    var delta_v = this.length/div_v;
    var teta, rho = this.radius;

    this.vertices = [];
    this.colors = [];
    this.normals = [];

    var i,j;

    for (i=0;i<=this.div_v;i++){
      for (j=0;j<this.div_u;j++){
            
            teta = j*delta_u;
            var x,y,z;
            var nx,ny,nz;

            x = rho*Math.cos(teta);
            y = rho*Math.sin(teta);
            z = i*delta_v;
            this.vertices.push(x);
            this.vertices.push(y);
            this.vertices.push(z);
            
            var normal_norm = Math.sqrt(x*x+y*y);
            
            if (normal_norm>EPS){
              x /=normal_norm;
              y /=normal_norm;
            }

            this.normals.push(x);
            this.normals.push(y);
            this.normals.push(0.0);

            
            this.colors.push(this.color.r);
            this.colors.push(this.color.g);
            this.colors.push(this.color.b);

        }
    }

    // Front cap and Back cap
    // First the front and back rings are defined and
    // finally the two last central vertices
    for (j=0;j<this.div_u;j++){
            
      teta = j*delta_u;
      var x,y,z;
      var nx,ny,nz;

      x = rho*Math.cos(teta);
      y = rho*Math.sin(teta);
      z = 0;
      this.vertices.push(x);
      this.vertices.push(y);
      this.vertices.push(z);
      
      var normal_norm = Math.sqrt(x*x+y*y);
      
      if (normal_norm>EPS){
        x /=normal_norm;
        y /=normal_norm;
      }

      this.normals.push(0.0);
      this.normals.push(0.0);
      this.normals.push(-1.0);
      this.colors.push(this.color.r);
      this.colors.push(this.color.g);
      this.colors.push(this.color.b);

    }

    for (j=0;j<this.div_u;j++){
            
      teta = j*delta_u;
      var x,y,z;
      var nx,ny,nz;

      x = rho*Math.cos(teta);
      y = rho*Math.sin(teta);
      z = this.div_v*delta_v;
      this.vertices.push(x);
      this.vertices.push(y);
      this.vertices.push(z);
      
      var normal_norm = Math.sqrt(x*x+y*y);
      
      if (normal_norm>EPS){
        x /=normal_norm;
        y /=normal_norm;
      }

      this.normals.push(0.0);
      this.normals.push(0.0);
      this.normals.push(1.0);
      this.colors.push(this.color.r);
      this.colors.push(this.color.g);
      this.colors.push(this.color.b);
    }


    this.vertices.push(0.0);
    this.vertices.push(0.0);
    this.vertices.push(0.0);
    this.colors.push(this.color.r);
    this.colors.push(this.color.g);
    this.colors.push(this.color.b);
    this.normals.push(0.0);
    this.normals.push(0.0);
    this.normals.push(-1.0);

    this.vertices.push(0.0);
    this.vertices.push(0.0);
    this.vertices.push(this.length);
    this.colors.push(this.color.r);
    this.colors.push(this.color.g);
    this.colors.push(this.color.b);
    this.normals.push(0.0);
    this.normals.push(0.0);
    this.normals.push(1.0);


    this.indicesTriangles = [];
    var i,j;
    for (i = 0; i<this.div_v;i++){
        for (j=0; j<this.div_u;j++){
          
          var index = (j%div_u)+(i)*div_u;
          var indexR = ((j+1)%div_u)+(i)*div_u;
          var indexU = (j%div_u)+(i+1)*div_u;
          var indexRU = ((j+1)%div_u)+(i+1)*div_u;

          this.indicesTriangles.push(index);
          this.indicesTriangles.push(indexR);
          this.indicesTriangles.push(indexRU);
          this.indicesTriangles.push(index);
          this.indicesTriangles.push(indexRU);
          this.indicesTriangles.push(indexU);
        }
    }

    for (j = 0; j<this.div_u;j++){
      var index = (j%div_u)+(div_v+1)*(div_u);
      var indexR = ((j+1)%div_u)+(div_v+1)*div_u;
      var indexD = (div_v+3)*(div_u);
      this.indicesTriangles.push(indexR);
      this.indicesTriangles.push(index);
      this.indicesTriangles.push(indexD);
    }



    for (j = 0; j<this.div_u;j++){
      var index = (j%div_u)+(div_v+2)*(div_u);
      var indexR = ((j+1)%div_u)+(div_v+2)*div_u;
      var indexD = (div_v+3)*(div_u)+1;
      this.indicesTriangles.push(index);
      this.indicesTriangles.push(indexR);
      this.indicesTriangles.push(indexD);
    }


    this.indicesLines = [];

    var i;  
    for (i = 0; i<this.indicesTriangles.length;i+=3){
      this.indicesLines.push(this.indicesTriangles[i]);
      this.indicesLines.push(this.indicesTriangles[i+1]);
      this.indicesLines.push(this.indicesTriangles[i+1]);
      this.indicesLines.push(this.indicesTriangles[i+2]);
      this.indicesLines.push(this.indicesTriangles[i+2]);
      this.indicesLines.push(this.indicesTriangles[i]);
    }

    this.indicesPoints = [];
    for (i=0;i<Math.floor(this.vertices.length/3.0);i++){
      this.indicesPoints.push(i);
    }

    this.init_buffers();

  }


  draw(renderingMode) {
    var gl = this.gl;

    // Bind VAO
    gl.bindVertexArray(this.VAO);

    // Depending on the rendering mode type, we will draw differently
    switch (renderingMode) {
      case 'TRIANGLES': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesTriangles), gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, this.indicesTriangles.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
      case 'LINES': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesLines), gl.STATIC_DRAW);
        gl.drawElements(gl.LINES, this.indicesLines.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
      case 'POINTS': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesPoints), gl.STATIC_DRAW);
        gl.drawElements(gl.POINTS, this.indicesPoints.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
      case 'TRIANGLES': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesTriangles), gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, this.indicesTriangles.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
    }

    // Clean
    gl.bindVertexArray(null);
  }

} 

class MySphere extends Shape3d{
  constructor(program,gl,radius,div_u,div_v,color){
    super(program,gl,color);
    this.div_u = div_u;
    this.div_v = div_v;
    this.radius = radius;
  
    var delta_u = 2*Math.PI/div_u;
    var delta_v = Math.PI/div_v;
    var teta, phi, rho = this.radius;

    this.vertices = [];
    this.colors = [];
    this.normals = [];

    var i,j;

    /*
    var colors = [
      1.0,  1.0,  1.0,
      0.0,  1.0,  0.0,
      0.0,  0.0,  1.0, 
      1.0,  1.0,  0.0,
      0.0,  1.0,  1.0,
      1.0,  0.0,  1.0,
      0.0,  0.0,  0.0,
      1.0,  0.0,  0.0,
    ];*/
  
    for (i=0;i<=this.div_v;i++){
      for (j=0;j<this.div_u;j++){
            phi =  i*delta_v;
            teta = j*delta_u;
            var x,y,z;

            x = rho*Math.sin(phi)*Math.cos(teta);
            y = rho*Math.sin(phi)*Math.sin(teta);
            z = rho*Math.cos(phi);
            this.vertices.push(x);
            this.vertices.push(y);
            this.vertices.push(z);
            this.colors.push(color.r);
            this.colors.push(color.g);
            this.colors.push(color.b);
            
            var normal_norm = Math.sqrt(x*x+y*y);
            
            if (normal_norm>EPS){
              x /=normal_norm;
              y /=normal_norm;
              z /=normal_norm;
              
            }

            this.normals.push(x);
            this.normals.push(y);
            this.normals.push(z);
            //this.colors.push(colors[(3*i)%4]);
            //this.colors.push(colors[(3*i+1)%4]);
            //this.colors.push(colors[(3*i+2)%4]);

        }
    }

    this.indicesTriangles = [];
    var i,j;
    for (i = 0; i<this.div_v;i++){
        for (j=0; j<this.div_u;j++){
        
          var index = (j%div_u)+(i)*div_u;
          var indexR = ((j+1)%div_u)+(i)*div_u;
          var indexU = (j%div_u)+(i+1)*div_u;
          var indexRU = ((j+1)%div_u)+(i+1)*div_u;

          this.indicesTriangles.push(index);
          this.indicesTriangles.push(indexR);
          this.indicesTriangles.push(indexRU);
          this.indicesTriangles.push(index);
          this.indicesTriangles.push(indexRU);
          this.indicesTriangles.push(indexU);
        }
    }



    this.indicesLines = [];

    var i;  
    for (i = 0; i<this.indicesTriangles.length;i+=3){
      this.indicesLines.push(this.indicesTriangles[i]);
      this.indicesLines.push(this.indicesTriangles[i+1]);
      this.indicesLines.push(this.indicesTriangles[i+1]);
      this.indicesLines.push(this.indicesTriangles[i+2]);
      this.indicesLines.push(this.indicesTriangles[i+2]);
      this.indicesLines.push(this.indicesTriangles[i]);
    }

    this.indicesPoints = [];
    for (i=0;i<Math.floor(this.vertices.length/3.0);i++){
      this.indicesPoints.push(i);
    }

    this.init_buffers();

  }


  draw(renderingMode) {
    var gl = this.gl;

    // Bind VAO
    gl.bindVertexArray(this.VAO);

    // Depending on the rendering mode type, we will draw differently
    switch (renderingMode) {
      case 'TRIANGLES': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesTriangles), gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, this.indicesTriangles.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
      case 'LINES': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesLines), gl.STATIC_DRAW);
        gl.drawElements(gl.LINES, this.indicesLines.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
      case 'POINTS': {
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesPoints), gl.STATIC_DRAW);
        gl.drawElements(gl.POINTS, this.indicesPoints.length, gl.UNSIGNED_SHORT, 0);
        break;
      }
    }

    // Clean
    gl.bindVertexArray(null);
  }
}


class Mouse{

  constructor(program,gl,hipRotVec,headRotVec,frontRightLegVec,frontLeftLegVec,backRightLegVec,backLeftLegVec){
    this.program = program;
    this.gl = gl;
    this.cube = new MyCube(this.program,this.gl,undefined);
    this.sphere = new MySphere(this.program,this.gl,1.0,32,32, new Color(1.0,0.0,0.0));
    this.cylinder = new MyCylinder(this.program,this.gl,2.0,4.0,32,32,new Color(0.8,0.4,0.0));
    this.sphere2 = new MySphere(this.program,this.gl,1.0,4,4,new Color(0.0,0.0,0.5));
    this._hipRotationVector = hipRotVec;
    this._headRotationVector = headRotVec;
    this._frontRightLegRotationVector = frontRightLegVec;
    this._frontLeftLegRotationVector = frontLeftLegVec;
    this._backRightLegRotationVector = backRightLegVec;
    this._backLeftLegRotationVector = backLeftLegVec;
  }

  get hipRotationVector(){return this._hipRotationVector;}

  set hipRotationVector(hipRotVec){this._hipRotationVector = hipRotVec;}

  get headRotationVector(){return this._headRotationVector;}

  set headRotationVector(hipRotVec){this._headRotationVector = hipRotVec;}

  get frontRightLegRotationVector(){return this._frontRightLegRotationVector;}

  set frontRightLegRotationVector(legRotVec){this._frontRightLegRotationVector = legRotVec;}

  get frontLeftLegRotationVector(){return this._frontLeftLegRotationVector;}

  set frontLeftLegRotationVector(legRotVec){this._frontLeftLegRotationVector = legRotVec;}

  get backRightLegRotationVector(){return this._backRightLegRotationVector;}

  set backRightLegRotationVector(legRotVec){this._backRightLegRotationVector = legRotVec;}

  get backLeftLegRotationVector(){return this._backLeftLegRotationVector;}

  set backLeftLegRotationVector(legRotVec){this._backLeftLegRotationVector = legRotVec;}



  drawHead(modelViewMatrix){
    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var tv = vec3.create();
      vec3.set(tv, 0.0, 1.0, 1.5);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      mat4.rotateX(modelViewMatrix,modelViewMatrix, this._headRotationVector[0] * Math.PI / 180);
      mat4.rotateY(modelViewMatrix,modelViewMatrix, this._headRotationVector[1] * Math.PI / 180);
      mat4.rotateZ(modelViewMatrix,modelViewMatrix, this._headRotationVector[2] * Math.PI / 180);

      //Empilhar a matriz corrente
      myMatrixStack.push(mat4.clone(modelViewMatrix));
        //Transforma localmente o primeiro cubo.  
        var tv = vec3.create();
        vec3.set(tv, -1.5, 2.0, 0.0);
        mat4.translate(modelViewMatrix,modelViewMatrix,tv);
        mat4.rotateY(modelViewMatrix,modelViewMatrix, 45.0 * Math.PI / 180);
        var s = vec3.create();
        vec3.set(s,0.5,0.7,0.1);
        mat4.scale(modelViewMatrix,modelViewMatrix,s)
        setProgramMatrices(this.program,modelViewMatrix);
        this.cylinder.draw(renderingMode);
      modelViewMatrix = myMatrixStack.pop();

      myMatrixStack.push(mat4.clone(modelViewMatrix));  
        var tv = vec3.create();
        vec3.set(tv, 1.5, 2.0, 0.0);
        mat4.translate(modelViewMatrix,modelViewMatrix,tv);
        mat4.rotateY(modelViewMatrix,modelViewMatrix, -45.0 * Math.PI / 180);
        var s = vec3.create();
        vec3.set(s,0.5,0.7,0.1);
        mat4.scale(modelViewMatrix,modelViewMatrix,s)
        setProgramMatrices(this.program,modelViewMatrix);
        this.cylinder.draw(renderingMode);
      modelViewMatrix = myMatrixStack.pop();
      
      
      myMatrixStack.push(mat4.clone(modelViewMatrix));  
      setProgramMatrices(this.program,modelViewMatrix);
        this.cube.draw(renderingMode);
      modelViewMatrix = myMatrixStack.pop();     
    

      myMatrixStack.push(mat4.clone(modelViewMatrix));  
        var tv = vec3.create();
        vec3.set(tv, 0.0, 0.0, 1.0);
        mat4.translate(modelViewMatrix,modelViewMatrix,tv);
        setProgramMatrices(this.program,modelViewMatrix);
        this.sphere.draw(renderingMode);
      modelViewMatrix = myMatrixStack.pop();

    modelViewMatrix = myMatrixStack.pop();
    
    return modelViewMatrix;
    
  }

  drawBody(modelViewMatrix){
    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var tv = vec3.create();
      //vec3.set(tv, 0.0, 0.0, 0.0);
      //mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      var s = vec3.create();
      vec3.set(s,2.0,2.0,2.0);
      mat4.scale(modelViewMatrix,modelViewMatrix,s)
      setProgramMatrices(this.program,modelViewMatrix);
      this.sphere.draw(renderingMode);
    modelViewMatrix = myMatrixStack.pop(); 

    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      //var tv = vec3.create();
      //vec3.set(tv, 0.0, 0.0, 0.0);
      //mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      setProgramMatrices(this.program,modelViewMatrix);
      this.cylinder.draw(renderingMode);
    modelViewMatrix = myMatrixStack.pop(); 


    var tv = vec3.create();
    vec3.set(tv, 0.0, 0.0, 4.0);
    mat4.translate(modelViewMatrix,modelViewMatrix,tv);
    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var s = vec3.create();
      vec3.set(s,2.0,2.0,2.0);
      mat4.scale(modelViewMatrix,modelViewMatrix,s)
      setProgramMatrices(this.program,modelViewMatrix);
      this.sphere.draw(renderingMode);
    modelViewMatrix = myMatrixStack.pop(); 

    modelViewMatrix = this.drawRightFrontLeg(modelViewMatrix);
    modelViewMatrix = this.drawLeftFrontLeg(modelViewMatrix);

    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var tv = vec3.create();
      vec3.set(tv, 0.0, 0.0, 0.25);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      this.drawHead(modelViewMatrix);
    modelViewMatrix = myMatrixStack.pop(); 
    

    return modelViewMatrix;

  }

  drawLeg(modelViewMatrix){
    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var tv = vec3.create();
      vec3.set(tv, 0.0, 0.0, 0.0);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      myMatrixStack.push(mat4.clone(modelViewMatrix));
        var s = vec3.create();
        vec3.set(s,0.5,1.5,1.0);
        mat4.scale(modelViewMatrix,modelViewMatrix,s)
        gl.uniformMatrix4fv(program.uModelViewMatrix, false, modelViewMatrix);
        this.sphere.draw(renderingMode);
      modelViewMatrix = myMatrixStack.pop(); 
      
      /*draw foreleg*/
      
      vec3.set(tv, 0.0,-1.0, 0.0);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      mat4.rotateX(modelViewMatrix,modelViewMatrix, 45.0 * Math.PI / 180);
      myMatrixStack.push(mat4.clone(modelViewMatrix));
        var s = vec3.create();
        vec3.set(s,0.25,0.25,0.5);
        mat4.scale(modelViewMatrix,modelViewMatrix,s)
        gl.uniformMatrix4fv(program.uModelViewMatrix, false, modelViewMatrix);
        this.cylinder.draw(renderingMode);
      modelViewMatrix = myMatrixStack.pop();

      /*draw paw*/

      vec3.set(tv, 0.0,0.0,2.5);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      mat4.rotateX(modelViewMatrix,modelViewMatrix, -45.0 * Math.PI / 180);
      var s = vec3.create();
      vec3.set(s,0.5,0.5,0.5);
      mat4.scale(modelViewMatrix,modelViewMatrix,s)
      gl.uniformMatrix4fv(program.uModelViewMatrix, false, modelViewMatrix);
      this.cube.draw(renderingMode);

    modelViewMatrix = myMatrixStack.pop();  

    return modelViewMatrix;


  }

  drawRightBackLeg(modelViewMatrix){
    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var tv = vec3.create();
      vec3.set(tv, -2.0, 0.0, 0.0);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      var s = vec3.create();
      vec3.set(s,1.1,1.1,1.1);
      mat4.scale(modelViewMatrix,modelViewMatrix,s)
      mat4.rotateX(modelViewMatrix,modelViewMatrix, this._backRightLegRotationVector[0] * Math.PI / 180);
      mat4.rotateY(modelViewMatrix,modelViewMatrix, this._backRightLegRotationVector[1] * Math.PI / 180);
      mat4.rotateZ(modelViewMatrix,modelViewMatrix, this._backRightLegRotationVector[2] * Math.PI / 180);
      setProgramMatrices(this.program,modelViewMatrix);
      modelViewMatrix = this.drawLeg(modelViewMatrix);
    modelViewMatrix = myMatrixStack.pop(); 

    return modelViewMatrix;

  }
  
  drawLeftBackLeg(modelViewMatrix){
    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var tv = vec3.create();
      vec3.set(tv, 2.0, 0.0, 0.0);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      var s = vec3.create();
      vec3.set(s,1.1,1.1,1.1);
      mat4.scale(modelViewMatrix,modelViewMatrix,s)
      mat4.rotateX(modelViewMatrix,modelViewMatrix, this._backLeftLegRotationVector[0] * Math.PI / 180);
      mat4.rotateY(modelViewMatrix,modelViewMatrix, this._backLeftLegRotationVector[1] * Math.PI / 180);
      mat4.rotateZ(modelViewMatrix,modelViewMatrix, this._backLeftLegRotationVector[2] * Math.PI / 180);
      setProgramMatrices(this.program,modelViewMatrix);
      modelViewMatrix = this.drawLeg(modelViewMatrix);
    modelViewMatrix = myMatrixStack.pop(); 

    return modelViewMatrix;
  }

  drawRightFrontLeg(modelViewMatrix){
    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var tv = vec3.create();
      vec3.set(tv, -2.0, -0.25, 0.0);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      mat4.rotateX(modelViewMatrix,modelViewMatrix, this._frontRightLegRotationVector[0] * Math.PI / 180);
      mat4.rotateY(modelViewMatrix,modelViewMatrix, this._frontRightLegRotationVector[1] * Math.PI / 180);
      mat4.rotateZ(modelViewMatrix,modelViewMatrix, this._frontRightLegRotationVector[2] * Math.PI / 180);
      setProgramMatrices(this.program,modelViewMatrix);
      modelViewMatrix = this.drawLeg(modelViewMatrix);
    modelViewMatrix = myMatrixStack.pop(); 
    return modelViewMatrix;
    
  }
  
  drawLeftFrontLeg(modelViewMatrix){
    myMatrixStack.push(mat4.clone(modelViewMatrix));  
      var tv = vec3.create();
      vec3.set(tv, 2.0, -0.25, 0.0);
      mat4.translate(modelViewMatrix,modelViewMatrix,tv);
      mat4.rotateX(modelViewMatrix,modelViewMatrix, this._frontLeftLegRotationVector[0] * Math.PI / 180);
      mat4.rotateY(modelViewMatrix,modelViewMatrix, this._frontLeftLegRotationVector[1] * Math.PI / 180);
      mat4.rotateZ(modelViewMatrix,modelViewMatrix, this._frontLeftLegRotationVector[2] * Math.PI / 180);
      setProgramMatrices(this.program,modelViewMatrix);
      modelViewMatrix = this.drawLeg(modelViewMatrix);
    modelViewMatrix = myMatrixStack.pop(); 
    return modelViewMatrix;
  }


  draw(modelViewMatrix){
    myMatrixStack.push(mat4.clone(modelViewMatrix));
      mat4.rotateX(modelViewMatrix,modelViewMatrix, this._hipRotationVector[0] * Math.PI / 180);
      mat4.rotateY(modelViewMatrix,modelViewMatrix, this._hipRotationVector[1] * Math.PI / 180);
      mat4.rotateZ(modelViewMatrix,modelViewMatrix, this._hipRotationVector[2] * Math.PI / 180);
      modelViewMatrix = this.drawBody(modelViewMatrix);
    modelViewMatrix = myMatrixStack.pop(); 
    modelViewMatrix = this.drawRightBackLeg(modelViewMatrix);
    modelViewMatrix = this.drawLeftBackLeg(modelViewMatrix);
    return modelViewMatrix;
  }

}

/*
class MyCube extends Shape3d{
    constructor(program,gl,color){
      super(program,gl,color);

      this.vertices = [
      -1.0, -1.0, -1.0,
       1.0, -1.0, -1.0,
       1.0,  1.0, -1.0,    
      -1.0,  1.0, -1.0,     
      -1.0, -1.0,  1.0,
       1.0, -1.0,  1.0,
       1.0,  1.0,  1.0,
      -1.0,  1.0,  1.0,
      ];

      var i;

      if (color != undefined){
        for (i = 0; i < 8;i++){
          this.colors.push(this.color.r);
          this.colors.push(this.color.g);
          this.colors.push(this.color.b);
        }
      }
      else{      
        this.colors = [
          1.0,  1.0,  1.0,
          0.0,  1.0,  0.0,
          0.0,  0.0,  1.0, 
          1.0,  1.0,  0.0,
          0.0,  1.0,  1.0,
          1.0,  0.0,  1.0,
          0.0,  0.0,  0.0,
          1.0,  0.0,  0.0,
        ];
      }


      this.indicesTriangles = [  
        0, 2, 1,
        0, 3, 2,
        0, 3, 7,
        0, 4, 7,
        4, 5, 6,
        4, 6, 7,
        5, 1, 2,
        5, 2, 6,
        2, 7, 6,
        2, 3, 7,
        1, 5, 4,
        0, 1, 4
      ];

      this.indicesLines = [];

      var i;  
      for (i = 0; i<this.indicesTriangles.length;i+=3){
        this.indicesLines.push(this.indicesTriangles[i]);
        this.indicesLines.push(this.indicesTriangles[i+1]);
        this.indicesLines.push(this.indicesTriangles[i+1]);
        this.indicesLines.push(this.indicesTriangles[i+2]);
        this.indicesLines.push(this.indicesTriangles[i+2]);
        this.indicesLines.push(this.indicesTriangles[i]);
      }

      this.indicesPoints = [];
      for (i=0;i<Math.floor(this.vertices.length/3.0);i++){
        this.indicesPoints.push(i);
      }

      this.init_buffers();

    }


    draw(renderingMode) {
      var gl = this.gl;

      // Bind VAO
      gl.bindVertexArray(this.VAO);

      // Depending on the rendering mode type, we will draw differently
      switch (renderingMode) {
        case 'TRIANGLES': {
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesTriangles), gl.STATIC_DRAW);
          gl.drawElements(gl.TRIANGLES, this.indicesTriangles.length, gl.UNSIGNED_SHORT, 0);
          break;
        }
        case 'LINES': {
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesLines), gl.STATIC_DRAW);
          gl.drawElements(gl.LINES, this.indicesLines.length, gl.UNSIGNED_SHORT, 0);
          break;
        }
        case 'POINTS': {
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indicesPoints), gl.STATIC_DRAW);
          gl.drawElements(gl.POINTS, this.indicesPoints.length, gl.UNSIGNED_SHORT, 0);
          break;
        }
      }

      // Clean
      gl.bindVertexArray(null);
    }

  }
*/