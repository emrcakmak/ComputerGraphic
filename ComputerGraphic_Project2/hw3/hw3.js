var canvas;
var gl;

var bufferNum1, bufferNum2, num1Vertices, num2Vertices;
var vPosition;


var indices;
var indices1;
var iBuffer;
var iBuffer1;
var count = 0;
var count1 = 2;
var count2 = 1;
var colors = [vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0)];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var theta = [ 0, 0, 0 ];
var axis = 0;

var degrees=0;
var trInputx = 0;
var trInputy = 0;
var scInputx = 1;
var scInputy = 1;

var vColor;
var cBuffer;
var program;

var axisred = 1;
var axisgreen,axisblue = 0;
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
	colors = [vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0)];
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Make the numbers
    num1Vertices = [
      vec2(  -0.35,  0.25 ),
      vec2(  -0.25,  0.25 ),
      vec2(  -0.15,  0.25 ),
	vec2(  -0.05,  0.25 ),

	vec2(  -0.35,  0.15 ),
	vec2(  -0.25,  0.15 ),
	vec2(  -0.15,  0.15 ),
	vec2(  -0.05,  0.15 ),

	vec2(  -0.35,  0.05 ),
	vec2(  -0.25,  0.05 ),
	vec2(  -0.15,  0.05 ),
	vec2(  -0.05,  0.05 ),

	vec2(  -0.35,  -0.05 ),
	vec2(  -0.25,  -0.05 ),
	vec2(  -0.15,  -0.05 ),
	vec2(  -0.05,  -0.05 ),

	vec2(  -0.35,  -0.15 ),
	vec2(  -0.25,  -0.15 ),
	vec2(  -0.15,  -0.15 ),
	vec2(  -0.05,  -0.15 ),

	vec2(  -0.35,  -0.25 ),
	vec2(  -0.25,  -0.25 ),
	vec2(  -0.15,  -0.25 ),
	vec2(  -0.05,  -0.25 )

    ];

    num2Vertices = [
     vec2(  0.05,  0.25 ),
      vec2(  0.15,  0.25 ),
      vec2(  0.25,  0.25 ),
	vec2(  0.35,  0.25 ),

	vec2(  0.05,  0.15 ),
	vec2(  0.15,  0.15 ),
	vec2(  0.25,  0.15 ),
	vec2(  0.35,  0.15 ),

	vec2(  0.05,  0.05 ),
	vec2(  0.15,  0.05 ),
	vec2(  0.25,  0.05 ),
	vec2(  0.35,  0.05 ),

	vec2(  0.05,  -0.05 ),
	vec2(  0.15,  -0.05 ),
	vec2(  0.25,  -0.05 ),
	vec2(  0.35,  -0.05 ),

	vec2(  0.05,  -0.15 ),
	vec2(  0.15,  -0.15 ),
	vec2(  0.25,  -0.15 ),
	vec2(  0.35,  -0.15 ),

	vec2(  0.05,  -0.25 ),
	vec2(  0.15,  -0.25 ),
	vec2(  0.25,  -0.25 ),
	vec2(  0.35,  -0.25 )
    ];

   indices = [
   [0,3,4,
	3,4,7,
	16,19,20,
	19,20,23,
	4,5,16,
	5,16,17,
	6,7,18,
	7,18,19],
	[2,3,22,
    22,3,23],
	[0,3,4,
	3,4,7,
	16,19,20,
	19,20,23,
	8,9,16,
	9,16,17,
	9,10,13,
	10,13,14,
	6,7,14,
	7,14,15],
	[2,3,22,
    3,22,23,
    16,18,20,
    18,20,22,
    8,10,12,
    10,12,14,
    0,2,4,
    2,4,6],
	[0,1,12,
    1,12,13,
    9,13,14,
    9,10,14,
    2,22,23,
    2,23,3],
	[0,3,4,
    3,4,7,
    4,12,5,
    12,5,13,
    9,11,13,
    11,13,15,
    14,22,15,
    22,15,23,
    16,18,20,
    18,20,22],
	[0,3,4,
    3,4,7,
    4,20,5,
    5,20,21,
    17,19,21,
    19,21,23,
    9,11,13,
    11,13,15,
    14,15,18,
    15,18,19],
	[0,3,4,
	3,4,7,
	6,22,7,
	22,7,23],
	[0,1,20,
    1,20,21,
    21,17,18,
    21,18,22,
    22,23,2,
    2,3,23,
    2,6,5,
    2,1,5,
    9,10,13,
    10,13,14],
	[7,6,22,
    22,7,23,
	0,3,4,
    3,4,7,
    4,5,12,
    12,13,5,
    9,13,10,
    13,14,10,
    16,18,20,
    20,22,18],
	

    ];
	
	indices1 = [
	[0,3,4,
	3,4,7,
	16,19,20,
	19,20,23,
	4,5,16,
	5,16,17,
	6,7,18,
	7,18,19],
	[2,3,22,
    22,3,23],
	[0,3,4,
	3,4,7,
	16,19,20,
	19,20,23,
	8,9,16,
	9,16,17,
	9,10,13,
	10,13,14,
	6,7,14,
	7,14,15],
	[2,3,22,
    3,22,23,
    16,18,20,
    18,20,22,
    8,10,12,
    10,12,14,
    0,2,4,
    2,4,6],
	[0,1,12,
    1,12,13,
    9,13,14,
    9,10,14,
    2,22,23,
    2,23,3],
	[0,3,4,
    3,4,7,
    4,12,5,
    12,5,13,
    9,11,13,
    11,13,15,
    14,22,15,
    22,15,23,
    16,18,20,
    18,20,22],
	[0,3,4,
    3,4,7,
    4,20,5,
    5,20,21,
    17,19,21,
    19,21,23,
    9,11,13,
    11,13,15,
    14,15,18,
    15,18,19],
	[0,3,4,
	3,4,7,
	6,22,7,
	22,7,23],
	[0,1,20,
    1,20,21,
    21,17,18,
    21,18,22,
    22,23,2,
    2,3,23,
    2,6,5,
    2,1,5,
    9,10,13,
    10,13,14],
	[7,6,22,
    22,7,23,
	0,3,4,
    3,4,7,
    4,5,12,
    12,13,5,
    9,13,10,
    13,14,10,
    16,18,20,
    20,22,18],
	

    ];
	
    //TODO: create and load geometry
    // Load the data into the GPU
	program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );    

	
	cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
	
	vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
	
    iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices[count1]), gl.STATIC_DRAW);
	
    iBuffer1 = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer1);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices1[count2]), gl.STATIC_DRAW);

    bufferNum1 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum1 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(num1Vertices), gl.STATIC_DRAW );
	 
    // Load the data into the GPU
    bufferNum2 = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum2 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(num2Vertices), gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    transformationMatrixLoc = gl.getUniformLocation( program, "transformationMatrix" );
	thetaLoc = gl.getUniformLocation(program, "theta"); 
	mvLoc = gl.getUniformLocation(program, "modelviewmatrix");
	
	document.getElementById("inp_number").oninput = function(event) {
        count = parseInt(event.target.value);
		count2 = count % 10; 
		count1 = Math.floor((count%100)/10);

		
		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer ); 
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices[count1]), gl.STATIC_DRAW);
		
	
		gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer1 );
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices1[count2]), gl.STATIC_DRAW);
		
		
    };
	
    document.getElementById("inp_objX").oninput = function(event) {
       trInputx = parseFloat(event.target.value,10);
    };
    document.getElementById("inp_objY").oninput = function(event) {
        trInputy = parseFloat(event.target.value,10);
    };
    document.getElementById("inp_obj_scaleX").oninput = function(event) {
        scInputx = parseFloat(event.target.value,10);
    };
    document.getElementById("inp_obj_scaleY").oninput = function(event) {
        scInputy = parseFloat(event.target.value,10);
    };
    document.getElementById("inp_rotation").oninput = function(event) {
		axis = zAxis;
        degrees = parseInt(event.target.value,10);
    };
    document.getElementById("redSlider").oninput = function(event) {
        axisred = parseFloat(event.target.value);
		colors = [vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0)];
	
	}
    document.getElementById("greenSlider").oninput = function(event) {
        axisgreen = parseFloat(event.target.value);
		colors = [vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0)];

    };
    document.getElementById("blueSlider").oninput = function(event) {
        axisblue = parseFloat(event.target.value);
		
		colors = [vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),
            vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0),vec4(axisred,axisgreen,axisblue,1.0)];
		
    };
	
    render();

};



function render() {
	

    gl.clear( gl.COLOR_BUFFER_BIT );

	theta[axis] = degrees;
	var modelviewmatrix = mat4();
	modelviewmatrix = mult(modelviewmatrix, translate(trInputx,trInputy,0));
	modelviewmatrix = mult(modelviewmatrix, rotate(theta[2],0,0,1));
	modelviewmatrix = mult(modelviewmatrix, scalem(scInputx,scInputy,1));
	
	
	
	gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer );
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum1 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.drawElements( gl.TRIANGLES, indices[count1].length, gl.UNSIGNED_BYTE, 0 );
	gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, iBuffer1 );
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferNum2 );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.drawElements( gl.TRIANGLES, indices1[count2].length, gl.UNSIGNED_BYTE, 0 );
	
	gl.uniformMatrix4fv( mvLoc, false, flatten(modelviewmatrix) );
    window.requestAnimFrame(render);
}
