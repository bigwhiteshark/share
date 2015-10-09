define(function() {
    function Scene3D(){
        this.objects = [];
    }
    var p = Scene3D.prototype;

    p.addObject = function( object ) {
        this.objects.push(object);
    };

    p.removeObject = function( object ) {
        var index = this.objects.indexOf(object);
        if(index != null){
            this.objects.splice(index, 1);
        }
    };

    return Scene3D;
});