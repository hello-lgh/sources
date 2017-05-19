$(window).load(function(){
	var emp;
	var iheight;
	var mask="<div id='mask'></div><a id='close'></a>";
		var pageheight = 200;
		var srcheught;
		$(window).scroll(function() {
			srcheught=$(this).scrollTop();
				if(srcheught>pageheight){
					$('#go_top').fadeIn('slow');
				}else{
					$('#go_top').fadeOut('slow');
				}});
				$("#go_top").click(function(){
					$('html, body').animate({scrollTop: 0}, 300);
					return false;
 		});
	$("#navs ul li a").each(function() {
		$(this).bind("click",function(){	
			$("body").append(mask);
			emp=$(this).attr("href");
			$("aside").removeClass();
			$(emp).addClass("now");
			iheight=parseInt($(emp).css("height"))+"px";
			$(emp).css({"margin-top":"-"+iheight});
			$(emp).animate({marginTop:0});
		});
    });
	
	
	$("#mask").live("click",function(){
		$(this).remove();
		$("#close").remove();
		$(emp).css({"margin-top":0});
		$(emp).removeClass();	
	});
	$("#close").live("click",function(){
		$(this).remove();
		$("#mask").remove();
		$(emp).css({"margin-top":0});
		$(emp).removeClass();	
	});
});