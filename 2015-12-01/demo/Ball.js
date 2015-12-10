function Ball(radius, color) {
    this.x = 0;
    this.y = 0;
    this.radius = radius || 20;
    this.color = color || '#ffff00';
    this.scaleX = 1;
    this.scaleY = 1;
    this.lineWidth = 0;

    //球的运动
    this.dirX = 1;
    this.dirY = 1;
    this.stepX = 3;
    this.stepY = 2;

}

Ball.prototype.paint = function(ctx) {
    ctx.save();
    //坐标转换
    ctx.translate(this.x, this.y);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    //绘制球
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2, true);
    ctx.lineWidth = 0;
    ctx.closePath();
    ctx.fill();
    if (this.lineWidth > 0) {
        ctx.stroke();
    }
    ctx.restore();
};

Ball.prototype.play = function(canvas) {
    var ctx=canvas.getContext("2d");
    if (this.x >= canvas.width) {
        this.dirX = -1;
    }
    if (this.x <= 0) {
        this.dirX = 1;
    }
    if (this.y >= canvas.height) {
        this.dirY = -1;
    }
    if (this.y <= 0) {
        this.dirY = 1;
    }

    this.x += this.stepX * this.dirX;
    this.y += this.stepY * this.dirY;
    this.paint(ctx);
}