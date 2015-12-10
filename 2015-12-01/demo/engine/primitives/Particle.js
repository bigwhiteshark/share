define(function(require){
    var inherits = require('util/inherits.js');
    var Object3D = require('Object3D.js');
    var Vector3 = require('math/Vector3.js');
    function Particle(material,size){
        Object3D.call(this, material);
        this.position = new Vector3(0,0,0);
        this.size = size || 10;
        this.type = 'Particle';
    }
    inherits(Particle,Object3D);

    return Particle;
});