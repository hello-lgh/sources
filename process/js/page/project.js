$(function(){				
//调用时间控件
$.datetimepicker.setLocale('ch');
$('.datetimepicker').datetimepicker({
	//只有时间
	//datepicker:false,
	//format:'H:i',
	//step:5,//时间间隔
	//只有日期
	lang:'ch',
	format:'Y-m-d',
	timepicker:false,
	readOnly:true
});
	
});