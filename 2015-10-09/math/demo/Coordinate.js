function PlaneCoordinate(container) {
    var container = typeof(container) == 'string' ? document.getElementById('container') : container;
    this.context = container.getContext('2d');
    this.width = container.width;
    this.height = container.height;
    this.orginX = this.width / 2;
    this.orginY = this.height / 2;


    this.calibration = 20; //刻度
    this.proportion = 2; //绘制比例
}

var p = PlaneCoordinate.prototype;

p.init = function() {
    this.clear();
    this.setFillColor("#000");
    this.setStrokeColor("#000");
    this.draw();
}

p.draw = function() {
    this.drawLine(0, this.orginY, this.width, this.orginY);
    this.drawLine(this.orginX, 0, this.orginX, this.height);
    this.drawAxis();
}

p.drawAxis = function() {
    this.setFillColor('#d1d1d1');
    this.context.fillText("O", this.orginX+5 , this.orginY+10);//原点坐标 0

    var calibration = this.calibration * this.proportion;
    var len = Math.max(this.width / 2, this.height / 2) / this.calibration;

    var fixed = this.proportion >= 1 ? function(x) {
        return x;
    } : function(x) {
        return (x).toFixed(1);
    };

    this.context.textBaseline = "middle";
    for (var i = 0; i <= len; i++) {
        var num = parseFloat(fixed(calibration * i));
        var p = this.project(calibration * i, 0); //第一象限
        var sx = p.x,
            sy = p.y;

        this.drawLine(sx, sy, sx, sy - 5);
        this.context.textAlign = "center";
        num && this.context.fillText(num, sx, sy + 10);


        p = this.project(0,-calibration*i);//第2象限
        sx = p.x,
        sy = p.y;
        this.drawLine(sx, sy, sx-5, sy);
        this.context.textAlign = "left";
        num && this.context.fillText(-num, sx+5, sy);


        p = this.project(-calibration*i,0);//第3象限
        sx = p.x,
        sy = p.y;
        this.drawLine(sx, sy, sx, sy-5);
        this.context.textAlign = "center";
        num && this.context.fillText(-num, sx, sy+10);

        p = this.project(0,calibration*i);//第4象限
        sx = p.x,
        sy = p.y;
        this.drawLine(sx, sy, sx-5, sy);
        this.context.textAlign = "left";
        num && this.context.fillText(num, sx+5, sy);
    }


}

p.setProportion = function(proportion) {
    this.proportion = proportion;
}

p.setCalibration = function(calibration) {
    this.calibration = calibration;
}

p.clear = function(x, y, width, height) {
    this.context.clearRect(x || 0, y || 0, width || this.width, height || this.height);
}

p.setFillColor = function(color) {
    this.context.fillStyle = color;
}

p.setStrokeColor = function(color) {
    this.context.strokeStyle = color;
}

p.project = function(x, y) {
    return {
        x: parseInt(this.orginX + (x / this.proportion)),
        y: parseInt(this.orginY - (y / this.proportion))
    }
}

p.drawPoint = function(x, y, width, height) {
    if (x < this.width && y < this.height) {
        this.drawRect(x, y, width || 2, height || 2);
    }
}

p.drawLine = function(x, y, dx, dy) {
    var context = this.context;
    context.beginPath();
    if (dx != undefined && dy != undefined) {
        context.moveTo(x, y);
    }
    context.lineTo(dx, dy);
    context.stroke();
}

p.drawRect = function(x, y, width, height,strokeColor) {
    var ctx = this.context;
    ctx.beginPath();
    ctx.strokeStyle  = strokeColor;
    ctx.lineWidth = 5;
    ctx.strokeRect(x - width / 2, y - height / 2, width, height);
    ctx.fillStyle = "red";
    ctx.fillText("p("+x+","+y+")",x-width/4,y+10);
    ctx.fillStyle = "blue";
    ctx.arc(x,y,5,0,2*Math.PI);
    ctx.fill();
}