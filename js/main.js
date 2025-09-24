const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera();
const renderer = new THREE.WebGLRenderer();

//scene.background = new THREE.Color( 0x000000 );
renderer.setSize( 800,800 );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.PlaneGeometry(0.3,0.2) ;
const material = new THREE.MeshBasicMaterial();
const dvd = new THREE.Mesh( geometry, material );
scene.add( dvd );

// -------- V A R I A B L E S --------
let xSpeed = 0.0023;
let ySpeed = 0.0043;
let bounces = 8;
const randX = THREE.MathUtils.randFloat(-0.8, 0.8);
const randY = THREE.MathUtils.randFloat(-0.8, 0.8);

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
    bounces--;
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

// places camera in front of object [Orthographic]
camera.position.z = 1;

// dvd position
//dvd.position.set(0,0); // starts at origin
dvd.position.set(randX,randY); // starts in random position

// starting dvd color
randomColor();

// --------- U P D A T E ---------
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