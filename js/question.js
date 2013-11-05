$(function(){
	$("#button2").click(function(){
		var s=$('input[name="type1"]:checked');
		var data={};
		switch(s) {
			data.question=$('#question1').value;
			case:0
				data.answer.text($('#answer').value);
				break;;
			case:1
				data.answer.a=($('#answer_a').value);
				data.answer.b=($('#answer_b').value);
				data.answer.c=($('#answer_c').value);
				break;;
			case:2
				data.answer.num=($('#answer_num').value);
				data.answer.unit=($('#answer_unit').value);
				break;;
			default:
				break;;
		}
		$.ajax({
			type:"POST",
			url:"http://127.0.0.1:5984/question",
			dataType:"jsonp",
			success:function(data){
				console.log(data);
				$("#area").append($("<span/>").append(data.couchdb));
			}
		});
	});
});
