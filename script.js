class Cube {
    constructor(x, y, z) {
        this.x = x
        this.y = y
        this.z = z
        this.material = material
    }


}

var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 1000)
    camera.position.z = 10;

    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#010101");
    renderer.setSize(window.innerWidth,window.innerHeight);

    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth,window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;

        camera.updateProjectionMatrix();
    })

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshLambertMaterial({color: 0xffffff});
    //var mesh = new THREE.Mesh(geometry, material);

    //scene.add(mesh);

    meshX = -10;
    for(var i = 0; i < 255; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = getRandomInt(-3, 3);
        mesh.position.y = getRandomInt(-3, 3);
        mesh.position.z = getRandomInt(-3, 3);
        scene.add(mesh);
        meshX+=1;
    }


    var light = new THREE.PointLight(0xFFFFFF, 1, 1000)
    light.position.set(0,0,0);
    scene.add(light);

    var light = new THREE.PointLight(0xFFFFFF, 2, 1000)
    light.position.set(0,0,25);
    scene.add(light);

    var render = function() {
        requestAnimationFrame(render);


        renderer.render(scene, camera);
    }

    function onMouseMove(event) {
        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(scene.children, true);
        for (var i = 0; i < intersects.length; i++) {
            this.tl = new TimelineMax();
            this.tl.to(intersects[i].object.scale, 1, {x: 2, y: 2, z: 2, ease: Expo.easeOut})
            this.tl.to(intersects[i].object.scale, .5, {x: .5, y: .5, z: .5, ease: Expo.easeOut})
            this.tl.to(intersects[i].object.position, .5, {x: getRandomInt(3), y: getRandomInt(3), z: getRandomInt(3), ease: Expo.easeOut})
            this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")
        }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    window.addEventListener('mousemove', onMouseMove);
    render();