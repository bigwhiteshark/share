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

    var RADIUS = 200;
    var QUANTITY = 200;

    var camera;
    var scene;
    var renderer;

    init();

    function init() {
        var container = document.createElement('div');
        document.body.appendChild(container);
        camera = new Camera3D();
        camera.fov = 30;
        scene = new Scene3D();
        renderer = new CanvasRenderer(scene, camera);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.viewport);
        createParticles();
        loop();
    }

    function createParticles() {
        for (var i = 0; i < QUANTITY; i++) {
            var material = new Color();
            material.setRGBA(random(1, 255), random(1, 255), random(1, 255), 1);
            var particle = new Particle(material, random(1, 15), 10);

            particle.position.x = 0;
            particle.position.y = 0;
            particle.position.z = 0;

            particle.offset = {
                x: 0,
                y: 0,
                z: 0
            };
            particle.shift = {
                x: 0,
                y: 0
            };
            particle.speed = 0.01 + Math.random() * 0.04;
            particle.targetSize = particle.size;

            scene.addObject(particle);
        }
    }

    function render() {
        var len = scene.objects.length;
        for (var i = 0; i < len; i++) {
            var particle = scene.objects[i];

            particle.speed = 0.01 + Math.random() * 0.04;
            particle.offset.x += particle.speed;
            particle.offset.y += particle.speed;

            particle.shift.x += (mouseX - particle.shift.x) * (particle.speed);
            particle.shift.y += (-mouseY - particle.shift.y) * (particle.speed);

            particle.position.x = particle.shift.x + Math.cos(i + particle.offset.x) * RADIUS;
            particle.position.y = particle.shift.y + Math.sin(i + particle.offset.y) * RADIUS;

            particle.position.z = i / QUANTITY * RADIUS;

            particle.size += Math.floor((particle.targetSize - particle.size) * 0.05);

            if (Math.round(particle.size) == Math.round(particle.targetSize)) {
                particle.targetSize = 1 + Math.random() * 10;
            }
        }

        renderer.render(scene, camera);
    }

    function loop() {
        requestAnimFrame(loop);
        render();
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);

    function onDocumentMouseDown(event) {
        event.preventDefault();

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
    }

    function onDocumentMouseMove(event) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
    }

    function onDocumentMouseUp(event) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
    }
});