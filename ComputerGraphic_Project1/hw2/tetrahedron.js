var canvas;
var gl;

//TODO: Define global variables if needed
var points = [];
var colors = [];


var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [ 0, 0, 0 ];



var mvLoc;

var degrees=0;
var trInputx = 0;
var trInputy = 0;
var scInputx = 1;
var scInputy = 1;

window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    var vertices = [
        vec3(  0.0000,  0.0000, -0.5000 ),
        vec3(  0.0000,  0.4714,  0.1665 ),
        vec3( -0.40825, -0.2357,  0.1665 ),
        vec3(  0.40825, -0.2357,  0.1665 )
    ];
    
    tetra( vertices[0], vertices[1], vertices[2], vertices[3]);

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    gl.enable(gl.DEPTH_TEST);

    
    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );    

    //TODO: generate tetrahedron geometry and send vertices and colors to GPU
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

	thetaLoc = gl.getUniformLocation(program, "theta"); 
	mvLoc = gl.getUniformLocation(program, "modelviewmatrix"); 
	
    // sliders for viewing parameters
    document.getElementById("rotX").oninput = function(event) {
		axis = xAxis;
        degrees = parseInt(event.target.value,10);
    };
	
    document.getElementById("rotY").oninput = function(event) {
		axis = yAxis;
        degrees = parseInt(event.target.value,10);
    };

    document.getElementById("objRotationZSlider").oninput = function(event) {
		axis = zAxis;
        degrees = parseInt(event.target.value,10);
    };
   
    document.getElementById("posX").oninput = function(event) {

        trInputx = parseFloat(event.target.value,10);
    };
	
    document.getElementById("posY").oninput = function(event) {

        trInputy = parseFloat(event.target.value,10);
    };
	
	document.getElementById("scaleX").oninput = function(event) {
		scInputx = parseFloat(event.target.value,10);
    };
	
    document.getElementById("scaleY").oninput = function(event) {
		scInputy = parseFloat(event.target.value,10);
    };
	   
	document.getElementById("ResetButton").addEventListener("click", function(){
	xAxis = 0;
	yAxis = 1;
	zAxis = 2;

	axis = 0;
	theta = [ 0, 0, 0 ];




	degrees=0;
	trInputx = 0;
	trInputy = 0;
	scInputx = 1;
	scInputy = 1;
   document.getElementById('scaleX').value = 1;
   document.getElementById('scaleY').value = 1;
   document.getElementById('posX').value = 0;
   document.getElementById('posY').value = 0;
   document.getElementById('rotX').value = 0;
   document.getElementById('rotY').value = 0;
   document.getElementById('objRotationZSlider').value = 0;
   
		
		
    });	
   
    render();
}
function triangle( a, b, c, color )
{

    // add colors and vertices for one triangle

    var baseColors = [
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 0.0)
    ];

    colors.push( baseColors[color] );
    points.push( a );
    colors.push( baseColors[color] );
    points.push( b );
    colors.push( baseColors[color] );
    points.push( c );
}

function tetra( a, b, c, d )
{
    // tetrahedron with each side using
    // a different color
    
    triangle( a, c, b, 0 );
    triangle( a, c, d, 1 );
    triangle( a, b, d, 2 );
    triangle( b, c, d, 3 );
}



//TODO:modify this function to render the shape and apply transformations
var render = function(){

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);   
	theta[axis] = degrees;
	var modelviewmatrix = mat4();
	
	
	modelviewmatrix = mult(modelviewmatrix, translate(trInputx,trInputy,0));
	
	
	
	modelviewmatrix = mult(modelviewmatrix, rotate(theta[2],0,0,1));
	modelviewmatrix = mult(modelviewmatrix, rotate(theta[1],0,1,0));
	modelviewmatrix = mult(modelviewmatrix, rotate(theta[0],1,0,0));
	
	

	modelviewmatrix = mult(modelviewmatrix, scalem(scInputx,scInputy,1));
		
	
	
	console.log(modelviewmatrix);
    gl.uniformMatrix4fv( mvLoc, false, flatten(modelviewmatrix));
	
	gl.drawArrays( gl.TRIANGLES, 0, 9);
    requestAnimFrame(render);
}
