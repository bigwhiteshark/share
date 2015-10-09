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
    var mouseXOnMouseDown = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    var isDraw;

    var camera;
    var scene;
    var renderer;

    init();
    //render();

    function init() {
        var container = document.createElement('div');
        document.body.appendChild(container);
        camera = new Camera3D();
        scene = new Scene3D();
        renderer = new CanvasRenderer(scene, camera);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.viewport);


        var m, n, x, y, i, r=80;
        for (i = 0; i <= 100; i += 1) {
            m = i;
            n = -r * (((Math.sin(i) * Math.sqrt(Math.abs(Math.cos(i)))) / (Math.sin(i) + 1.4)) - 2 * Math.sin(i) + 2);
            x = n * Math.cos(m) + windowHalfX;
            y = n * Math.sin(m) + windowHalfY/2;
            
            var material = new Color();
            material.setRGBA(random(1, 255), random(1, 255), random(1, 255), 1);
            var particle = new Particle(material, random(1, 15));
            particle.position = new Vector3(x - windowHalfX, y - windowHalfY, random(-50,50));
            scene.addObject(particle);
        }
        loop();
    }

    function render() {
        var len = scene.objects.length;
        for (var i = 0; i < len; ++i) {
            var object = scene.objects[i];
            //scene.objects[i].rotateX((windowHalfX - mouseX) * .009);
            scene.objects[i].rotateY((windowHalfY - mouseY) * .009);
        }



        /*for (var i = 0; i < len; ++i) {
            var object = scene.objects[i];
            object.rotateY((windowHalfX - mouseX) * .007);
            object.rotateX((windowHalfY - mouseY) * .007);
            object.material.setAlpha(object.material.a - .01)
        }*/

        renderer.render(scene, camera);
    }

    function loop() {
        requestAnimFrame(loop);
        render();
    }

    function createHeartPoint() {
        var m, n, x, y, i;
        for (i = 0; i <= 200; i += 0.04) {
            m = i;
            n = -r * (((Math.sin(i) * Math.sqrt(Math.abs(Math.cos(i)))) / (Math.sin(i) + 1.4)) - 2 * Math.sin(i) + 2);
            x = n * Math.cos(m) + dx;
            y = n * Math.sin(m) + dy;
            createPoint(x, y, c);
        }
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