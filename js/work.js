$(function(){
	var output=function(msg){
		console.log("some");
		console.log(msg);
	};
	$("#button1").click(function(){
		$.ajax({
			type:"GET",
			url:"http://127.0.0.1:5984",
			dataType:"jsonp",
//			jsonp:"callback",
//			success:output
			success:function(data){
				console.log(data);
				$("#area").append($("<span/>").append(data.couchdb));
			}
		});
	});
});
