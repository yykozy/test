//curl --get 'https://api.twitter.com/1.1/statuses/home_timeline.json' --header 'Authorization: OAuth oauth_consumer_key="1PtcA9DRyEKyX0Va3rXpA", oauth_nonce="64accdb73312733838fdaa605e656444", oauth_signature="uFjs9N5V4RLg%2Fjcp%2BWPblF1W55g%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1382490953", oauth_token="130063040-PWWQ0pU5UFxaH6yqL02GfVvwmpiA2B5lqjVBrKtP", oauth_version="1.0"' 
$(function(){
var TW = function() {
//	this.init(config);
};
TW.prototype = {
	config : {
		consumerKey:'1PtcA9DRyEKyX0Va3rXpA',
		consumerSecret:'wkQfSi2xCikh70a4csvCYkm7cgnl9HiM4TtOOpaNPB8',
		requestTokenUrl: 'https://api.twitter.com/oauth/request_token',
		authorizeUrl: 'https://api.twitter.com/oauth/authorize',
		accessTokenUrl: 'https://api.twitter.com/oauth/access_token',
	},
	init : function(config){
		this.getRequestToken();
	},
	getRequestToken : function(){
    var p = {
//        "oauth_callback": "http://127.0.0.1/hoge.html",
        "oauth_consumer_key": this.config.consumerKey,
        "oauth_nonce": this.getNonce(),
        "oauth_signature_method": "HMAC-SHA1",
        "oauth_timestamp": new Date()/1000 | 0,
        "oauth_version": "1.0"
		};
var msg = "GET&"+ encodeURIComponent( this.config.requestTokenUrl)+ "&"+ encodeURIComponent($.param(p));
//		console.log(msg);
var hash = CryptoJS.HmacSHA1(msg, this.config.consumerSecret+"&");
//		console.log(hash.toString());
//	p.oauth_signature = hash.toString();

//p.splice(3,0,CryptoJS.enc.Base64.stringify(hash));
//p.oauth_signature = CryptoJS.enc.Base64.stringify(hash);
var oauth_signature = encodeURIComponent(CryptoJS.enc.Base64.stringify(hash));
console.log(msg);
var q={};
for(i in p){
	if(i=="oauth_signature_method") q["oauth_signature"]=oauth_signature;
	q[i]=p[i];
}
//console.log($.param(q));
$.ajax({
   type: "GET",
   url: this.config.requestTokenUrl,
   //data: encodeURIComponent($.param(p)),
   data: $.param(q),
	dataType: "jsonp",  //ここでjsonpを指定する
	jsonp: false,       //jQueryによるcallback関数名の埋め込みはしない
	cache: true,         //リクエストパラメータに時刻を埋め込まない
//	headers: 'OAuth oauth_nonce='+p.oauth_nonce+', oauth_callback="", oauth_signature_method="HMAC-SHA1", oauth_timestamp="'+p.oauth_timestamp+'", oauth_consumer_key="'+p.oauth_consumer_key+'", oauth_signature="'+p.oauth_signature+'", oauth_version="1.0"' ,
/*
		beforeSend : function( xhr ){
			for( i in p ){
	      xhr.setRequestHeader(i , p[i] );
			}
    },
*/
   success: function(msg){
     console.log( "return: " + msg );
   },
   error: function(msg){
     console.log( "error: " + msg );
   },
 });

 	},
	getAccessToken: function(){
	},
	getNonce: function(){
		var str='';
		for(i=0;i<32;i++){
			str += Math.floor(Math.random()*16).toString(16);
		}
		return str;
	},
}

var tw = new TW();
tw.init();

});
