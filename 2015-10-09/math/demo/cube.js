define(function(require) {
    var Vector3 = require('math/Vector3.js');
    var Camera3D = require('Camera3D.js');
    var Scene3D = require('Scene3D.js');
    var CanvasRenderer = require('CanvasRenderer.js');
    var Particle = require('primitives/Particle.js');
    var Plane = require('primitives/Plane.js');
    var Color = require('Color.js');
    var random = require('util/random.js');

    var mouseX = 0;
    var mouseY = 0;
    var mouseXOnMouseDown = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var isDraw;

    var shapes = [];

    var camera;
    var scene;
    var renderer;

    init();

    function init() {
        var container = document.createElement('div');
        document.body.appendChild(container);
        camera = new Camera3D();
        scene = new Scene3D();
        renderer = new CanvasRenderer(scene, camera);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.viewport);
        createCube();
        loop();
    }

    function createCube() {
        var vertices = [];
        vertices.push(new Vector3(-100, -100, -100));
        vertices.push(new Vector3(100, -100, -100));
        vertices.push(new Vector3(100, 100, -100));
        vertices.push(new Vector3(-100, 100, -100));
        vertices.push(new Vector3(-100, -100, 100));
        vertices.push(new Vector3(100, -100, 100));
        vertices.push(new Vector3(100, 100, 100));
        vertices.push(new Vector3(-100, 100, 100));

        shapes.push(new Plane(null,vertices[0], vertices[1], vertices[2], vertices[3]));
        shapes.push(new Plane(null,vertices[4], vertices[5], vertices[6], vertices[7]));
        shapes.push(new Plane(null,vertices[0], vertices[4], vertices[7], vertices[3]));
        shapes.push(new Plane(null,vertices[0], vertices[1], vertices[5], vertices[4]));
        shapes.push(new Plane(null,vertices[1], vertices[5], vertices[6], vertices[2]));
        shapes.push(new Plane(null,vertices[3], vertices[7], vertices[6], vertices[2]));

        for(var i=0;i<6;i++){
            var plane = shapes[i];
            var material = new Color();
            material.setRGBA(random(100, 255), random(100, 255), random(100, 255), 1);
            plane.material = material;
            scene.addObject(plane);
        }
    }

    function render() {
        var len = scene.objects.length;
        for (var i = 0; i < len; ++i) {
            var plane = scene.objects[i];
            //plane.rotateX((windowHalfY - mouseY) * .002);
            plane.rotateY((windowHalfX - mouseX) * .001);
        }

        renderer.render(scene, camera);
    }

    function loop() {
        requestAnimFrame(loop);
        render();
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);

    function onDocumentMouseDown(event) {
        isDraw = true;
        event.preventDefault();

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
    }

    function onDocumentMouseMove(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function onDocumentMouseUp(event) {
        isDraw = false;
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
    }
});