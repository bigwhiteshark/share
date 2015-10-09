define(function(require){
    var inherits = require('util/inherits.js');
    var Object3D = require('Object3D.js');
    function Line(material,spoint,epoint){
        Object3D.call(this,material);
        this.width = 1;
        this.spoint = spoint;
        this.epoint = epoint;
        this.type = "Line";
    }
    inherits(Line,Object3D);
    var p = Line.prototype;

    p.rotateX = function(angle){
        this.spoint.rotateX(angle);
        this.epoint.rotateX(angle);
    }

    p.rotateY = function(angle){
        this.spoint.rotateY(angle);
        this.epoint.rotateY(angle);
    }

    p.rotateZ = function(angle){
        this.spoint.rotateZ(angle);
        this.epoint.rotateZ(angle);
    }

    p.scale = function(s){
        this.spoint.scale(s);
        this.epoint.scale(s);
    }
    return Line;
});