define(function() {
    //2D向量的分量表现形式
    function Vector2(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    var p = Vector2.prototype;

    p.add = function(v) {
        this.x += v.x;
        this.y += v.y;

        return this;
    }

    p.sub = function(v) {
        this.x -= v.x;
        this.y -= v.y;

        return this;
    }

    p.dot = function(v) {
        return this.x * v.x + this.y * v.y;
    }

    p.multiplyScalar = function(s) {
        this.x *= s;
        this.y *= s;

        return this;
    }

    p.divideScalar = function(scalar) {
        if (scalar !== 0) {
            var invScalar = 1 / scalar;
            this.x *= invScalar;
            this.y *= invScalar;

        } else {
            this.x = 0;
            this.y = 0;
        }
        return this;
    };

    p.negate = function() {
        return this.multiplyScalar(-1);
    }

    p.length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    p.normalize = function() {
        return this.divideScalar(this.length());
    }

    p.distanceTo = function(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    p.distanceToSquared = function(v) {
        var dx = this.x - v.x,
            dy = this.y - v.y;
        return dx * dx + dy * dy;
    }


    //2D向量的极坐标表现形式
    function Polar(mag, dir) {
        this.mag = mag;
        this.dir = dir;
    }

    //2D向量极坐标转换成向量分量形式
    function vectorToPolar(polar) {
        var mag = polar.mag;
        var dir = polar.dir;

        var x = mag * Math.cos(dir * Math.PI / 180);
        var y = mag * Math.sin(dir * Math.PI / 180);

        return new Vector2(x, y);
    }

    p.toString = function() {
        return  this.x + " ," + this.y;
    }

    //2D向量分量形式转换成向量极坐标
    function polarToVector(vector) {
        var x = vector.x;
        var y = vector.y;
        var mag = Math.sqrt(x * x + y * y);
        if (mag == 0) {
            return new Polar(0, 0);
        }
        var dir = (180 / Math.PI) * Math.asin(y / mag);
        //当角度位于第二或第三象限
        if (x < 0) {
            dir += 180;
        } else if (x > 0 && y < 0) {
            dir += 360;
        }
        return new Polar(mag, dir);
    }

    //点乘求两向量的夹角
    function angleBewteenVector2(v1, v2) {
        return Math.acos(v1.dot(v2) / (v1.length() * v2.length()))
    }
    return Vector2;
});