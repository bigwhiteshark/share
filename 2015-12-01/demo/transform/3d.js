define(function(require) {
    var Vector3 = require('math/Vector3.js');
    var Camera3D = require('Camera3D.js');
    var Scene3D = require('Scene3D.js');
    var CanvasRenderer = require('CanvasRenderer.js');
    var Line = require('primitives/Line.js');
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
        createxyz();
        loop();
    }

    function createxyz(){
        for(var i=0;i<100;i++){
            var material = new Color();
            material.setRGBA(255, 0, 0, 1);
            var spoint = new Vector3(0,0,0);
            var epoint = new Vector3(windowHalfX/2,0,0);
            var lineX = new Line(material,spoint,epoint);
            scene.addObject(lineX);

            var material = new Color();
            material.setRGBA(0,255, 0, 1);
            var spoint = new Vector3(0,0,0);
            var epoint = new Vector3(0,windowHalfY/2,0);
            var lineY = new Line(material,spoint,epoint);
            scene.addObject(lineY);

            var material = new Color();
            material.setRGBA(0, 0,255, 1);
            var spoint = new Vector3(0,0,0);
            var epoint = new Vector3(300,0,windowHalfY/2);
            var lineZ = new Line(material,spoint,epoint);
            lineZ.rotateX(60);
            scene.addObject(lineZ);
        }
    }

    function render() {
        var len = scene.objects.length;
        for (var i = 0; i < len; ++i) {
            var obj = scene.objects[i];
            if(obj instanceof Plane){
                obj.rotateY((windowHalfX - mouseX) * .003);
                //obj.rotateY((windowHalfY - mouseY) * .003);
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
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function onDocumentMouseUp(event) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
    }
});