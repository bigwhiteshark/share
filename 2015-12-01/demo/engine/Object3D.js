define(function(require){
    var Vector3 = require('math/Vector3.js');
    function Object3D(material){
        this.position = new Vector3(0, 0, 0);
        this.material = material;
    }
    var p = Object3D.prototype;

    p.rotateX = function(angle){
        this.position.rotateX(angle);
    }

    p.rotateY = function(angle){
        this.position.rotateY(angle);
    }

    p.rotateZ = function(angle){
        this.position.rotateZ(angle);
    }

    p.scale = function(s){
        this.position.scale(s);
    }

    return Object3D;
});