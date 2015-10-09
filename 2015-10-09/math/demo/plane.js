define(function(require) {
    var Vector3 = require('math/Vector3.js');
    var Camera3D = require('Camera3D.js');
    var Scene3D = require('Scene3D.js');
    var CanvasRenderer = require('CanvasRenderer.js');
    var Plane = require('primitives/Plane.js');
    var Color = require('Color.js');
    var random = require('util/random.js');

    var mouseX = 0;
    var mouseY = 0;
    var mouseXOnMouseDown = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

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

        var p1 = new Vector3(-100,-100,0);
        var p2 = new Vector3(100,-100,0);
        var p3 = new Vector3(100,100,0);
        var p4 = new Vector3(-100,100,0);

        var material = new Color();
        material.setRGBA(random(1, 255), random(1, 255), random(1, 255), 1);
        var plane = new Plane(material,p1,p2,p3,p4);
        scene.addObject(plane);
        loop();
    }

    function render() {
        var len = scene.objects.length;
        for (var i = 0; i < len; ++i) {
            var plane = scene.objects[i];
            plane.rotateX((windowHalfX - mouseX) * .009);
            plane.rotateY((windowHalfY - mouseY) * .009);
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
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function onDocumentMouseUp(event) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
    }
});