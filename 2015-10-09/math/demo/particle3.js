define(function(require) {
    var Vector3 = require('math/Vector3.js');
    var Camera3D = require('Camera3D.js');
    var Scene3D = require('Scene3D.js');
    var CanvasRenderer = require('CanvasRenderer.js');
    var Particle = require('primitives/Particle.js');
    var Color = require('Color.js');
    var random = require('util/random.js');

    var mouseX = 0;
    var mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var isDraw;

    var camera;
    var scene;
    var renderer;

    init();

    function init() {
        var container = document.createElement('div');
        document.body.appendChild(container);
        camera = new Camera3D();
        camera.fov = -1000;
        scene = new Scene3D();
        renderer = new CanvasRenderer(scene, camera);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.viewport);
        createParticle();
        loop();
    }

    function createParticle() {
        var particle, material;
        for (var zpos = -2000; zpos < 2000; zpos += 20) {
            var material = new Color();
             material.setRGBA(random(100, 255), random(100, 255), random(100, 255), 1);
            var particle = new Particle(material, random(1, 5));
            particle.position.x = Math.random() * 1000 - 500;
            particle.position.y = Math.random() * 1000 - 500;
            particle.position.z = zpos;
            scene.addObject(particle);
        }
    }

    function render() {
        var len = scene.objects.length;
        for (var i = 0; i < len; ++i) {
            particle = scene.objects[i];
            particle.position.z += mouseY * 0.05;
            if (particle.position.z > 1000) {
                particle.position.z -= 2000;
            }
        }
        renderer.render(scene, camera);
    }

    function loop() {
        requestAnimFrame(loop);
        render();
    }

    //document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    function onDocumentMouseDown(event) {
        event.preventDefault();

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
    }

    function onDocumentMouseMove(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function onDocumentMouseUp(event) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
    }
});