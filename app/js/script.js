$(function() {
	var angle = 0;
  	setInterval(function(){
    	angle+=3;
  		$("section img").rotate(angle);
  	},50)
});