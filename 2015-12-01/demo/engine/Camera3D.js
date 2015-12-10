define(function(require) {
    var inherits = require('util/inherits.js');
    var Vector3 = require('math/Vector3.js');
    var Object3D = require('Object3D.js');

    function Camera3D(fov) {
        Object3D.call(this);

        this.position = Vector3(0, 0, 0);
        this.fov = 1000;
    }
    inherits(Camera3D,Object3D);    
    var p = Camera3D.prototype;

    p.lookAt = function(vector) {

    }
    return Camera3D;
});