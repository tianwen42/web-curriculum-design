$(function(){
	$("#notice .wrap").css({"margin-left":"800px","width":"300px"});
	notice();
})

function notice(){
	setInterval(function(){
		var pos = $("#notice .wrap").css("margin-left");
			pos = parseInt(pos);
		if(pos<-300){
			$("#notice .wrap").css({"margin-left":"800px","width":"300px"});
		}else{
			$("#notice .wrap").css("margin-left",pos-1+"px");
		}
	},10);
}