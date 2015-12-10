define(function(){
    return function(min,max){
        return Math.floor(((Math.random() * (max - min)) + min));
    }
});