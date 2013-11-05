var TwitterAPI  = function(config){
	this.setConfig(config);
}

TwitterAPI.prototype.consumer = {
	consumerKey:"",
	consumerSecret:"",
	token_secret:""
};

TwitterAPI.prototype.setConfig = function(config) {
	this.consumer.consumerKey = config.consumerKey;
	this.consumer.consumerSecret = config.consumerSecret;
};

TwitterAPI.prototype.getRequestToken = function() {
    var accessor = {
      consumerSecret: this.consumer.consumerSecret, 
    };
    
    var message = {
      method: "POST", 
//      action: "http://twitter.com/oauth/request_token", 
      action: "https://api.twitter.com/oauth/request_token", 
//      action: "http://localhost/work/docs/hoge.php", 
      parameters: { 
				//oauth_callback: "http://www.yahoo.co.jp",
				oauth_callback: "http://127.0.0.1/hoge.html",
        oauth_consumer_key: this.consumer.consumerKey,
				oauth_nonce:"",
        oauth_signature_method: "HMAC-SHA1", 
				oauth_timestamp:"",
				oauth_version: "1.0",
        oauth_signature: "", 
      }
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);
console.log(target);
		var header=OAuth.getAuthorizationHeader('', message.parameters);
    var options = {
      type: message.method,
      url: target,
//      url: message.action,
        dataType: "jsonp",  //ここでjsonpを指定する
        jsonp: false,       //jQueryによるcallback関数名の埋め込みはしない
        cache: true,         //リクエストパラメータに時刻を埋め込まない
/*
			headers : {
				"Authorization": header
			},
*/
      success: function(d, dt) { 
console.log('hoge');
console.log(d);
console.log('fuga');
/* 返り値からRequest Token/Request Token Secretを取り出して、PINを取得するためのURLを作成 */ },
			error:function(d){
console.log('hoge');
console.log(d);
console.log('fuga');
}
    };
    $.ajax(options); // 送信
};

TwitterAPI.prototype.getAccessToken = function(pin) {
    var accessor = {
      consumerSecret: this.consumer.consumerSecret, 
      tokenSecret: this.token_secret // Request Token Secret
    };
    
    var message = {
      method: "GET", 
      action: "http://twitter.com/oauth/access_token", 
      parameters: { 
        oauth_signature_method: "HMAC-SHA1", 
        oauth_consumer_key: this.consumer.consumerKey, 
        oauth_token: this.token, // Request Token
        oauth_verifier: pin
      }
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);
    var target = OAuth.addToURL(message.action, message.parameters);
    var options = {
      type: message.method,
      url: target,
      success: function(d, dt) { /* 返り値からAccess Token/Access Token Secretを取り出す */ },
    };
    $.ajax(options); // 送信
  };

$(function(){
	var p = {
		consumerKey:'1PtcA9DRyEKyX0Va3rXpA',
		consumerSecret:'wkQfSi2xCikh70a4csvCYkm7cgnl9HiM4TtOOpaNPB8',
	}
	var tw = new TwitterAPI(p);
	tw.getRequestToken();
});


