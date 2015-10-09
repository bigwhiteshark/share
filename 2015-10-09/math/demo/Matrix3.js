function Matrix3() {
    this.elements = [1, 0, 0,
                     0, 1, 0,
                     0, 0, 1];
}

var p = Matrix3.prototype;
p.translate = function(v){
    var elems = this.elements; 
    
}