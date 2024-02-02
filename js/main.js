const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera();
const renderer = new THREE.WebGLRenderer();

//scene.background = new THREE.Color( 0x000000 );
renderer.setSize( 800,800 );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry(0.4,0.3) ;
const material = new THREE.MeshBasicMaterial();
const dvd = new THREE.Mesh( geometry, material );
scene.add( dvd );

// -------- V A R I A B L E S --------
let xSpeed = 0.0023;
let ySpeed = 0.0043;
let bounces = 8;

// -------- F U N C T I O N S --------

// to generate a random rgb color for the material.
function randomColor()
{
    dvd.material.color.setRGB(Math.random(256), Math.random(256), Math.random(256));
}

// to decrease dvd scale on hit.
function dvdSize()
{
    dvd.scale.x -= 0.1;
    dvd.scale.y -= 0.1;
}

// decrement and print the variable 'bounces left'.
function bouncesLeft()
{
    bounces -= 1;
    console.log("DVD BOUNCES LEFT: " + bounces);
}

// stop the movement of the dvd after 8 bounces.
function stopMovement() 
{
    xSpeed = 0;
    ySpeed = 0;
    dvd.visible = false;
    console.log("Program Finished!");
}
// -------- END OF FUNCTIONS --------

camera.position.z = 5;

// default dvd position
dvd.position.set(0,0,0);

// starting dvd color
randomColor();

function animate() {
	requestAnimationFrame( animate );

    dvd.position.x += xSpeed
    dvd.position.y += ySpeed

    if (dvd.position.x > 0.85)
    {
        xSpeed = -0.0023;
        randomColor();
        dvdSize();
        bouncesLeft();
    }
    else if (dvd.position.x < -0.85)
    {
        xSpeed = 0.0023;
        randomColor();
        dvdSize();
        bouncesLeft();
    }
    else if (dvd.position.y > 0.9)
    {
        ySpeed = -0.0043;
        randomColor();
        dvdSize();
        bouncesLeft();
    }
    else if (dvd.position.y < -0.9)
    {
        ySpeed = 0.0043;
        randomColor();
        dvdSize();
        bouncesLeft();
    }
    else if (bounces <= 0)
    {
        stopMovement();
    }

    renderer.render( scene, camera );

};

animate();