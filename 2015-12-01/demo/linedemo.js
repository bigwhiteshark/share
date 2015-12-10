define(function(require) {
    var Vector3 = require('math/Vector3.js');
    var Camera3D = require('Camera3D.js');
    var Scene3D = require('Scene3D.js');
    var CanvasRenderer = require('CanvasRenderer.js');
    var Line = require('primitives/Line.js');
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

    function init(){
        var container = document.createElement('div');
        document.body.appendChild(container);
        camera = new Camera3D();
        scene = new Scene3D();
        renderer = new CanvasRenderer(scene, camera);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.viewport);
        createLines();
        loop();
    }

    function createLines(){
        for(var i=0;i<100;i++){
            var material = new Color();
            material.setRGBA(random(1, 255), random(1, 255), random(1, 255), 1);
            var spoint = new Vector3(random(-300,300),random(-300,300),random(-300,300));
            var epoint = new Vector3(random(-300,300),random(-300,300),random(-300,300));
          /*  var spoint = new Vector3(100,100,100);
            var epoint = new Vector3(100,100,400);*/
            var line = new Line(material,spoint,epoint);
            scene.addObject(line);


         /*   var material = new Color();
            material.setRGBA(random(1, 255), random(1, 255), random(1, 255), 1);
            var particle = new Particle(material, 15);
            particle.position = spoint;
            var material = new Color();
            material.setRGBA(255, 255,255, 1);
            var particle2 = new Particle(material, 15);
            particle2.position = epoint;
            scene.addObject(particle);
            scene.addObject(particle2);*/
        }
    }

    function render() {
        var len = scene.objects.length;
        for (var i = 0; i < len; ++i) {
            var line = scene.objects[i];
            line.rotateY((windowHalfX - mouseX)*.005);
            line.rotateX((windowHalfY - mouseY)*.005);
            //scene.objects[i].rotateZ((windowHalfY - mouseY)*.005);
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