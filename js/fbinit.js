(function(){
String.prototype.evaluate = 
      function(o){return this.replace(/%([a-zA-Z0-9]+)/g,function(m,$1){return o[$1];});};
//簡易テンプレート
Number.prototype._    = function(a){return (a+this).slice(-a.length);};
//ゼロパディング
Date.prototype.getMon = function(){return this.getMonth()+1;};
//日本風月数値表示
Date.prototype.format = 
    function(f,$){$=this;return f.evaluate({y:($.getYear()+"").slice(-2),
Y:$.getFullYear(),m:$.getMon()._("00"),d:$.getDate()._("00"),H:$.getHours()._("00"),
M:$.getMinutes()._("00"),S:$.getSeconds()._("00")});};
//日付フォーマティングメソッド定義

var getFBTime = function(created_time){
//create_FB_date = (created_time)->
    //return new Date((created_time or "").replace(/-/g, "/").replace(/[TZ]/g, " "))
    return new Date(created_time.replace(/-/g,"/").replace(/T/g, " ").replace(/\+0000/g, ""));
}

  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '316115401860792',                        // App ID from the app dashboard
//      channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel file for x-domain comms
			oauth			 : true,
      status     : true,                                 // Check Facebook Login status
      xfbml      : true                                  // Look for social plugins on the page
    });

    // Additional initialization code such as adding Event Listeners goes here
FB.login(
  function(response) {
console.log(response);
	if(response.status === 'connected') {
		console.log("Thank you");
		var accessToken = response.authResponse.accessToken;
		showUserData(accessToken);
	}else {
		console.log("I'm sorry");
	}
  },
  { scope: 'read_stream,read_friendlists' }
);
};
  // Load the SDK asynchronously
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

var showUserData= function(accessToken) {
	FB.api('/me/posts'
	, { access_token: accessToken ,limit:100}
	, function(response) {
console.log(response);
var post={week:0,month:0,year:0};
var likes={week:0,month:0,year:0};
//現在の時刻
var now=new Date();
//１週間前
var week=new Date(now.getFullYear(),now.getMonth(),now.getDate()-7);
//１ヶ月前
var month=new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
//１年前
var year=new Date(now.getFullYear()-1,now.getMonth(),now.getDate());
	// 取得後のコールバック
	var contents = '';
	for (var i = 0; i < response.data.length; i++) {
	var b_week=false;
	var b_month=false;
	var b_year=false;
		for (var elem in response.data[i]) {
if(elem=='created_time'){
	var fbtime=getFBTime(response.data[i][elem]);
//	console.log(fbtime);
	if(fbtime>week) { post.week++; b_week=true; }
	if(fbtime>month) { post.month++; b_month=true; }
	if(fbtime>year) { post.year++; b_year=true; }
}
if(elem=='likes'){
var count=response.data[i][elem].data.length;
console.log(fbtime.format("%Y/%m/%d")+":"+count);
	if(b_week) likes.week+=count;
	if(b_month) likes.month+=count;
	if(b_year) likes.year+=count;
}
//			contents += elem + ' : ' + response.data[i][elem] + '<br>';
//	contents += '<hr>';
		}
	}
	contents += '<hr>';
	contents += '<h2>post</h2>';
	contents += 'week('+week.format("%Y/%m/%d")+'-) : ' + post.week +'<br>';
	contents += 'month('+month.format("%Y/%m/%d")+'-) : ' + post.month+'<br>';
	contents += 'year('+year.format("%Y/%m/%d")+'-) : ' + post.year+'<br>';
	contents += '<hr>';
	contents += '<h2>likes</h2>';
	contents += 'week('+week.format("%Y/%m/%d")+'-) : ' + likes.week +'<br>';
	contents += 'month('+month.format("%Y/%m/%d")+'-) : ' + likes.month+'<br>';
	contents += 'year('+year.format("%Y/%m/%d")+'-) : ' + likes.year+'<br>';
// ウォールの内容を表示させる
	document.getElementById('result').innerHTML = contents;
	});
}
})();
