

$(function(){

	var speed=300;
	var myIndex;
			
	var $stage=$(".stage");
	$stage.each(function() {	
		$(this).bind("click",function(){
			aoto();
		}); 
	});
	  
	function aoto(){
		
		$stage.each(function() {
			
		  $(this).animate({marginLeft:'+=150px'},speed,function(){
			return false ;
			});
		});
	}
	  
});


function who(a){
	switch (a) {
  	case "0":  myIndex="qy";//使用中
    break;
 	case "1": myIndex="disable";//停用
    break;
 	case "2": myIndex="cancel";//注销
    break;
	}
	a.addClass(type);
}
