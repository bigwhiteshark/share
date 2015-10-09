define(function(require){
    var inherits = require('util/inherits.js');
    var Object3D = require('Object3D.js');
    var Vector3 = require('math/Vector3.js');
    function Plane(material,p1,p2,p3,p4){
        Object3D.call(this,material);
        this.vertices = [p1,p2,p3,p4];
        this.type = 'Plane';
    }
    inherits(Plane,Object3D);
    var p = Plane.prototype;

    p.rotateX = function(angle){
        this.vertices[0].rotateX(angle);
        this.vertices[1].rotateX(angle);
        this.vertices[2].rotateX(angle);
        this.vertices[3].rotateX(angle);
    }

    p.rotateY = function(angle){
        this.vertices[0].rotateY(angle);
        this.vertices[1].rotateY(angle);
        this.vertices[2].rotateY(angle);
        this.vertices[3].rotateY(angle);
        return this;
    }

    p.rotateZ = function(angle){
        this.vertices[0].rotateZ(angle);
        this.vertices[1].rotateZ(angle);
        this.vertices[2].rotateZ(angle);
        this.vertices[3].rotateZ(angle);
        return this;
    }

    p.scale = function(s){
        this.vertices[0].scale(s);
        this.vertices[1].scale(s);
        this.vertices[2].scale(s);
        this.vertices[3].scale(s);
        return this;
    }

    return Plane;
})