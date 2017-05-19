$(function(){			
var speed=100;//全局动画变量
//菜单调用函数
var $nav=$("#nav span");
$nav.each(function() {
	$(this).bind("click",function(){
		$("#nav span em").remove();
		$("#nav li.show").removeClass("show");				
	 	$(this).parent("li").addClass("show").children("div").slideDown();
	}); 
	});
	
//注释
//获取当前位置
var nowMenuTitle=$(".main_title h1 abbr").attr("data-m");
var nowMenuList=$(".main_title h1 abbr").attr("data-l");
menuLoc(nowMenuTitle,nowMenuList);
});

function showToolsBox(a){
	var boxName=a.attr("data-fun");
	$(".tools_box ul li").hide();
	$(".tools_box ul li."+boxName).slideDown();
}

function menuLoc(a,b){
	var $nowLi=$("#nav li:eq("+a+")");
	var height=$nowLi.css("line-height");
	$nowLi.children("div").children("a:eq("+b+")").append("<abbr></abbr>");
	$nowLi.children("div").children("a").children("abbr").css("height",height);
	$nowLi.addClass("show");
}

function operation(){
	var operationInfo=$("#tOperation").html();
	
}