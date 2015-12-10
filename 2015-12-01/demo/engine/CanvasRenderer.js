define(function(require) {
    function CanvasRenderer() {

        this.viewport = document.createElement("canvas");
        this.context = this.viewport.getContext("2d");

        this.autoClear = true;
    }
    var p = CanvasRenderer.prototype;

    p.setSize = function(width, height) {
        this.viewport.width = width;
        this.viewport.height = height;
        this.width = width;
        this.height = height;

        var widthHalf = width / 2;
        var heightHalf = height / 2;
        this.widthHalf = widthHalf;
        this.heightHalf = heightHalf;
        this.context.translate(widthHalf, heightHalf);
    }

    p.render = function(scene, camera) {
        this.fov = camera.fov;
        if (this.autoClear) {
            this.clear();
        }
       
        for (var i = 0; i < scene.objects.length; ++i) {
            var object = scene.objects[i];
            switch (object.type) {
                case 'Particle':
                    this.drawParticle(object);
                    break;
                case 'Line':
                    this.drawLine(object);
                    break;
                case 'Plane':
                    this.drawPlane(object);
                    break;
            }
        }
    }

    p.clear = function() {
        var context = this.context;
        var widthHalf = this.widthHalf;
        var heightHalf = this.heightHalf;
        context.clearRect(-widthHalf, -heightHalf, this.width, this.height);
    }

    p.drawParticle = function(particle) {
        var vector2d = particle.position.projectTo2D(this.fov);
        var context = this.context;
        context.beginPath();
        context.arc(vector2d.x, vector2d.y, particle.size, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = particle.material.styleString;
        context.fill();
    }

    p.drawLine = function(line) {
        var spoint = line.spoint.projectTo2D(this.fov);
        var epoint = line.epoint.projectTo2D(this.fov);
        var context = this.context;
        context.lineWidth = line.width;
        context.beginPath();
        context.moveTo(spoint.x, spoint.y);
        context.lineTo(epoint.x, epoint.y);
        context.strokeStyle = line.material.styleString;
        context.stroke();
    }

    p.drawPlane = function(plane) {
        var vertices = plane.vertices;
        var context = this.context;
        context.beginPath();
        for (var i = 0; i < plane.vertices.length; i++) {
            var vertice = plane.vertices[i];
            var vector2d = vertice.projectTo2D(this.fov);
            if(i==0){
                context.moveTo(vector2d.x,vector2d.y);
            }else{
                context.lineTo(vector2d.x,vector2d.y);
            }
        }        
        context.strokeStyle = plane.material.styleString;
        context.fillStyle = plane.material.styleString;
        context.closePath();
        context.fill();
    }

    return CanvasRenderer;
});