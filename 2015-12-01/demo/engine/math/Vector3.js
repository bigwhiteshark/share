define(function(require) {
    var Vector2 = require('math/Vector2.js');

    var RADIANS = Math.PI / 180;

    function Vector3(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    var p = Vector3.prototype;

    p.projectTo2D = function(fov) {
        var scale = fov / (fov + this.z);
        var x = this.x * scale;
        var y = this.y * scale;
        return new Vector2(x, y);
    }

    p.rotateX = function(angle) {
        var cos = Math.cos(angle * RADIANS);
        var sin = Math.sin(angle * RADIANS);

        var y = this.y;
        var z = this.z;

        this.y = y * cos - z * sin;
        this.z = y * sin + z * cos;

        return this;
    }

    p.rotateY = function(angle) {
        var cos = Math.cos(angle * RADIANS);
        var sin = Math.sin(angle * RADIANS);

        var z = this.z;
        var x = this.x;

        this.x = x * cos + z * sin;
        this.z = x * -sin + z * cos;

        return this;
    }

    p.rotateZ = function(angle) {
        var cos = Math.cos(angle * RADIANS);
        var sin = Math.sin(angle * RADIANS);

        var x = this.x;
        var y = this.y;

        this.x = x * cos - y * sin;
        this.y = x * sin + y * cos;

        return this;
    }

    p.scale = function(scale){
        this.x *= scale; 
        this.y *= scale; 
        this.z *= scale;
        return this; 
    }

    p.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        this.z = Math.round(this.z);

        return this;
    };

    p.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;

        return this;
    }

    p.add = function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;

        return this;
    }

    p.normalise = function() {
        var x = this.x;
        var y = this.y;
        var z = this.z;

        dist = Math.sqrt((x * x) + (y * y) + (z * z));

        this.x = x * (1.0 / dist);
        this.y = y * (1.0 / dist);
        this.z = z * (1.0 / dist);

        return this;
    }

    p.toString = function() {
        return this.x + " , " + this.y + ", " + this.z;
    }
    return Vector3;
});