
$(function(){
	var bnnnum=0;//轮播动画索引值
	var speed=400;//动画时间基本单位
	var movespeed=6000;//定时器周期
	var $stage=$("#cont li");//场景动画元素
	var $cont=$("#cont");//场景动画父元素
	var $main=$(".main");//主体
	var maxLength=$stage.length;//当前场景动画元素个数
	var iWidth=$(window).width();//场景宽度
	//var bi=$stage.children(".cont").width()/$(window).width();//计算场景动画与窗体宽度的比例
	var ulWidth=iWidth*maxLength+"px";	//计算场景动画主体UL宽度
	var _num="";
	var numCont="<div id='numCont'></div>";//场景动画计数元素
	var obj;
	var end= false;
	var windowOpen=false;
	
	//调用场景构造函数
	pagelayout();
	//增加轮播提示小圆圈
	$main.append(numCont);
	cNumCont(maxLength);
	//开始轮播
	var startMoveCilp=self.setInterval(automove, movespeed);
	//构造轮播动画
	function move(){
		$cont.animate({left:-iWidth*bnnnum+'px'},speed,function(){
			return false ;
		});
		box("#cont X:"+-iWidth*bnnnum+'px');
	}
	//轮播调用
	function automove(){
		if(windowOpen==false){
			bnnnum++;
			//判断是否轮播到最后
			if(bnnnum==maxLength){
				bnnnum=0;
				$cont.css({"left":0,"opacity":0});
				$cont.animate({opacity:1});
				//结束轮播
				moveend();
			}else{
				move();
			}
			clip();
			obj="#numCont a:eq("+bnnnum+")";
			$(obj).addClass("now").siblings().removeClass("now");
		}
	}
	
	//轮播场景动画元素初始化，定位元素位置，增加元素倒影
	$stage.each(function() {
		$(this).css("left",iWidth*$(this).index());
		var $ele=$(this).children(".cont").children("span");
		var img="<abbr class='pageShow'></abbr><abbr><img src='"+$ele.children("img").attr("src")+"'></abbr>";
		$ele.append(img);
		//鼠标在当前动画元素上时，移除自动轮播
		$(this).bind("mouseover",function(){
			clearInterval(startMoveCilp);
			page($(this));
		});
		//鼠标离开后重新开始轮播
		$(this).bind("mouseleave",function(){
			if(!end){
				startMoveCilp=setInterval(automove, movespeed);	
			}
			pageEnd($(this));
			
		});
	});
	$(".pageShow").bind("click",function(){
		windowOpen=true;
		$("body").append("<div class='page'><div id='pageCont'><a class='cloes'>x</a></div></div>");
		var _html=$(this).parents("li").html();
		$("#pageCont").append(_html);
		$("a.cloes").bind("click",function(){
			$(".page").remove();
			windowOpen=false;
		});
		$(".page").animate({top:"60px",opacity:1},speed);
		
	});

	//构造场景动画计数元素
	function cNumCont(a){
		for(var i=0;i<a;i++){
			_num+="<a></a>";
		}
		$("#numCont").append(_num);
		$("#numCont a:first").addClass("now");
	}
	//为场景动画计数元素绑定点击事件
	$("#numCont a").each(function() {
            $(this).bind("click",function(){
				numFun($(this));
			});
     });
	 //圆圈响应时间,表示当前，点击后滚动到当前所选位置
	function numFun(a){
		bnnnum=a.index();
		$("#numCont a").removeClass();
		a.addClass("now");
		move();
		clip();
	}  
	//根据当前窗体宽度定义轮播滚动尺寸，并且定义轮播元素宽度
	function pagelayout(){
		iWidth = $(window).width();
		ulWidth=iWidth*maxLength;
		$cont.width(ulWidth);
		$stage.each(function() {
            $(this).css({"width":iWidth,"left":iWidth*$(this).index()});
        });	
	}
	//窗体宽度发生变化时候调用
	$(window).resize(function() {
		pagelayout();
		
	});

	//渲染动画部分
	//构造舞台渲染动画体
	var $movieClipCont=$(".movieClip");
	cMovieClipCont();
	var $movieClip=$(".movieClip div");
	function cMovieClipCont(){
		var _html="";
			for(var i=0;i<8;i++){
				_html+="<div></div>";
			}
			$movieClipCont.append(_html);
			
		}
//舞台渲染动画动作,按照index索引定义元素动画
	function clip(){
		$movieClip.each(function() {
			var t=$(this).index();
			$(this).width(0);
			$(this).animate({width:t*10+10,opacity:0.05*t+0.1},speed*2,function(){
					return false;
			});
			
		});
	}
//舞台渲染动画元素构造
	$movieClip.each(function() {
		var t=$(this).index();
		$(this).css({"width":1*t+1,"margin-right":3*t+5});
	});
//轮播结束后执行
	function moveend(){
		clearInterval(startMoveCilp);
		end=true;
	}
//构造子页面
	
	function page(a){
		a.children(".cont").children("span").children(".pageShow").show();
	}
	function pageEnd(a){
		a.children(".cont").children("span").children(".pageShow").hide();
	}
	
	$(".videoBtn").click(function(){

		if($(this).attr("v-type")==="1"){
			 $("video").attr("src","images/main-video.webm");
			 $("video2").attr("src","images/main-video.mp4");
			$(this).attr("v-type","0")
		}else{
			 $("video").attr("src","images/cloud.mp4");
			 $("video2").attr("src","images/cloud.mp4");
			$(this).attr("v-type","1")		
		}
			
	});
});
//打印消息
function box(a){
	$(".logo abbr").html(a);
}


