$(function(){
	var TW=function(){}
TW.prototype={
	options:{
		url:"gettw.php",
		dataType:"jsonp",
	},
	init:function(){},
	getTL:function(){
//		var data={type:"home_timeline"};
		var success = function(msg){
			console.log(msg);
			var h=$('<div id="hoge"></div>');
			var tag=$('<dl id="tag'+i+'"></dl>');
			for(var i=0;i<msg.length;i++){
				var obj=msg[i];
				for(var j in obj ){
					tag.append($("<dt></dt>").append(j+":")).append($("<dd></dd>").append(obj[j]));
				}
				h.append(tag).after($("<br />"));
			}
			$("#box").append(h);
		}
		var error = function(msg){
			console.log("error:"+msg);
		}
		var options = this.options;
		options.success=success;
		options.error=error;
/*
		var param={};
		if(!this.oauth_token || !this.oauth_token_secret){
			param={type:'init',bc:'hoge'};
		}
		options.data=param;
console.log(options);
*/
		$.ajax(options);
	},
}
var tw=new TW();
tw.getTL();
});
