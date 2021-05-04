window.onload = () => {

    const obj = {};

    // Three js set up
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xbfe3dd );
    const loader = new THREE.TextureLoader();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    const objLoader = new THREE.OBJLoader();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('scene').appendChild( renderer.domElement );

    //App code

    const light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 0, 5, 10 );
    light.castShadow = true; // default false
    scene.add( light );

    objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', (root) => {
        const material = [
            new THREE.MeshPhongMaterial({color: 0xffffff})//map: loader.load('https://threejsfundamentals.org/threejs/resources/images/flower-1.jpg')})
        ];
        root.traverse( function ( root ) {
            root.material = material[0];
        });
        scene.add(root);
        obj.root = root;
        obj.root.position.y -= 5;
        obj.root.rotation.y += 5;
    });

    camera.position.z = 10

    controls.update();

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();

}