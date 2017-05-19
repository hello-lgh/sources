$(function(){
	
  var $hamburger=$(".hamburger"); 	
  var $filter=$(".filter a");
  var $outPut=$(".outPut code p"); 
  var $down=$(".more"); 
  
  var _html="";
  

  
  $filter.each(function() {
    $(this).live("click",function(){
		val($(this));
		$(this).parent().children("a").removeClass("now");
		$(this).addClass("now");
		out(_html);
	});
});

	var $filterCont=$(".filter li")
	$down.live("click",function(){
		$filterCont.removeClass("sildown");
		var type=$(this).attr("type-now");
		if(type=="0"){
			$(this).attr("type-now","1");
			$(this).html("UP");
			$(this).removeClass("down").addClass("up");
			$(this).parent("li").addClass("sildown");		
		}else{
			$(this).attr("type-now","0");
			$(this).html("Down");
			$(this).removeClass("up").addClass("down");
			$(this).parent("li").removeClass("sildown");
		}
		
	});
	
	
	function out(a){
		$(".outPut").hide();
		$outPut.html(a);
		$(".outPut").slideDown();	
	}
	function val(a){
		var name=a.attr("data-type");//选项名
		var val=a.html();//选项值
		var tVal=a.parents("li").children("span").html();	//选项类别值
		var tName=a.parents("li").children("span").attr("role");//选项类别名
		_html="Your choice is "+"<b>"+val+"</b> of "+"<b>"+tName+"</b>";	
	}
	
	var _more="<abbr class='more down' type-now='0'>Down</abbr>";
	$filterCont.each(function() {
        var contHeight=$(this).children("div").height();
		var iHeight=$(this).height();
		if(iHeight<contHeight){
			$(this).append(_more);	
		}
    });
});