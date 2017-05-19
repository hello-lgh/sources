$(function(){			
var speed=100;//全局动画变量

//菜单调用函数
var $nav=$("#nav span");
$nav.each(function() {
	$(this).bind("click",function(){
		$("#nav span em").remove();
		$nav.removeClass("now");
		$(this).addClass("now");
		$(this).prepend("<em></em>");
		$("#nav ul li dl.show").removeClass("show").slideUp();					
	 	$(this).parent("li").children("dl").addClass("show").slideDown();
	}); 
});

//子菜单调用函数
var $subnav=$("#nav dd");
$subnav.each(function() {	
	$(this).bind("click",function(){
		$subnav.removeClass("now")
		$(this).addClass("now");
	}); 
});

//菜单
getData('admin/logininfo','','showMenu','menu');
//mac & ip 地址联动
var $mac=$(".mac"); 
var $ip=$(".ip");
//选择mac地址时调用
$mac.live("change",function(){
	var selectNow = $(this).get(0).selectedIndex;	
	$(this).parents(".details em").children("span.ipSpan").children("select").get(0).selectedIndex=selectNow;
});
	

//选择IP地址时调用
$ip.live("change",function(){
	var selectNow=$(this).get(0).selectedIndex;
	$(this).parents(".details em").children("span.macSpan").children("select").get(0).selectedIndex=selectNow;
});


//增加或者减少MAC & IP 地址输入栏
var $addIp=$("#addIp"); 
//设置栏数
var addipnum=0;
//增加
$addIp.click(function(){
	addipnum++;
	var form="<div class='full macAndip'>" +
				"<div class='form_cont'> <span>MAC"+addipnum+"：</span>" +
					"<div class='select'>" +
						"<input type='text' class='from_input' jmj_required=\"true\" jmj_vilder=\"\" id='macUrl_"+addipnum+"' name='macs'>" +
					"</div>" +
				"</div>" +
				"<div class='form_cont'> <span>IP"+addipnum+"：</span>" +
					"<div class='select'>" +
						"<input type='text' class='from_input' jmj_required=\"true\" jmj_vilder=\"ip\" id='ipUrl_"+addipnum+"' name='ips'>" +
					"</div>" +
				"</div>" +
			"</div>";
	$(this).parent(".full").before(form);
});
//减少
var $jian=$("#jianIp"); 
$jian.click(function(){
	if(addipnum<0){
		addipnum=0;
		alertBox("错误信息","请您至少输入一组MAC,IP地址信息");
	}else{
		$(".macAndip:last").remove();
		addipnum--;
	}
});
//获取密码按钮事件

$("a.getpsd").click(function(){
	$(this).hide().parent().children("em").show().css("display","block");
});

//设置版权信息宽度
$("footer").css("width",window.innerWidth-180);
//设置报表图表宽度
$("#container").css("width",window.innerWidth-260);

//查询窗体统一函数
var $select=$("#selectcont");
var $selectbtn=$("#selectcont .form_btn button");
var $result=$("#result");
var selectbtn="<div id='selectbox'><a>展开查询条件</a></div>";
var $selectbox=$("#selectbox");

$selectbtn.click(function(){
		$select.slideUp('fast');
		$result.slideDown('fast');
		$select.after(selectbtn);
		//valiForm("formsearch");
});
$selectbox.live("click",function(){
		$select.slideDown('fast');
		$(this).remove();
});

//开通短信接口显示剩余密钥
var $keyHtml=$("#keyHtml"); 
	$keyHtml.mouseleave(function(){
		$(this).removeClass("show");	
	});
	$keyHtml.mouseover(function(){
		$(this).addClass("show");
	});
});



//菜单当前位置调用
function menu(a,b,c){	
	var $menu=$("#nav").children("ul:eq("+a+")").children("li:eq("+b+")");
	$menu.children("span").addClass("now").prepend("<em></em>");
	$menu.children("dl").slideDown();
	var mytitle=$(document).attr("title")+" - "+$menu.children("span").children("a").html();
	$(document).attr("title",mytitle);
	if(c!=null){
		$menu.children("dl").children("dd").removeClass("now");
		$menu.children("dl").children("dd:eq("+c+")").addClass("now");	
	}
}

/*//展开和识别接收列表号码接收状态 
function msgInfo(a){
	if(a.attr('data-num')=="0"){
		a.attr('data-num',"1");
		a.html("收起");
		//var msgInfo="<tr id='msgInfoCont'><td colspan='6' class='none'><div id='msgInfo'></div></td></tr>";
		//a.parents("tr").after(msgInfo);
		//$("#msgInfo").load("inc/msgInfo.html");
		a.parents("tr").next("#msgInfoCont").show();
		//展开接收列表
		$(".showPhone").live("click",function(){
		$(this).parent(".msgInfoList").css({"height":"auto","overflow":"inherit"});
			$(".listType").show();
		}); 
		//根据接收状态选择显示接收列表
		$(".listType a").live("click",function(){
			var type=$(this).attr("data-name");
			var $type=".msgInfoList p [data-type="+type+"]";		
			$(this).addClass("now").siblings().removeClass("now");
			if(type=="all"){
				$(".msgInfoList i").show();	
			}else{
				$(".msgInfoList i").hide();
				$($type).show();		
			}
		}); 
	}else{
		a.attr('data-num',"0");
		a.html("详情");
		a.parents("tr").next("#msgInfoCont").hide();
	}
}*/

//定义客户当前状态种类
function type(a,b){
	var type="";
	switch (b) {
  	case "0":  type="qy";//使用中
    break;
 	case "1": type="disable";//停用
    break;
 	case "2": type="cancel";//注销
    break;
	case "3": type="ready";//待启用
    break;
	}
	a.addClass(type);
}

//构造弹出窗
function alertBox(title,msg){

	var box="<div class='mask'></div><div class='alert'><h1><a class='title'>"+title+"</a></h1><p>"+msg+"<a class='box_close'></a><p><button type='button' class='btn btn-org removeTip'>确 定</button></div>";
	$(".warp").append(box);
	//增加弹出窗关闭,确定按钮事件
	$(".box_close").live("click",function(){
		removealertbox();
		
	});
	$(".removeTip").live("click",function(){
		removealertbox();
		
	});
	
}

//退出
function toLogout(){
	
window.location.href=publicUrl+"admin/logout";
}

//显示菜单
function showMenu(data){
if(data.isSuccess==-1){
window.location.href=publicUrl+"login/index";
}else{	
var austr=JSON.stringify(data.authorities);

$("#nav li a").each(function(i,e){
	if($(e).attr("id")+"" !="undefined" && austr.indexOf($(e).attr("id"))<=-1){
		if($(e).attr("id")=="SMS_HISTORY_SEARCH" || $(e).attr("id")=="SMS_TIME_SEARCH" || $(e).attr("id")=="STATISTICS_REPORT_MANAGE" ||$(e).attr("id")=="STATISTICS_BUSSINESS_REPORT_MANAGE"){
			
		$(e).parents("dd").remove();
		}else{
		$(e).parents("li").remove();
		}
	}
});
if($(".icon_ls").parents().next().children("dd").length==0){
	$(".icon_ls").parents("li").remove();
}
if($(".icon_bb").parents().next().children("dd").length==0){
	$(".icon_bb").parents("li").remove();
}
//显示用户名
$(".wel").find("a").html(data.userName);

if(data.authorities.length >=12){
	if($("#selectOrinput").attr("class")+"" !="undefined"){
		  var _html="<div class='form_cont' style='width:324px'> <span>客户名/手机号：</span>";
		  _html+="<div class='select boder'>";
		  _html+=" <select class='from_minSelect' name='h_type'>";
		  _html+=" <option selected>客户名</option> <option>手机号</option></select>";
		   _html+=" <input type='text' class='from_selectInput' name='h_typetxt' />";
		  _html+=" </div> </div>";
		$("#selectOrinput").html(_html);
	}
}

}
}

function removealertbox(){
	$(".mask").remove();
	$(".alert").remove();
}