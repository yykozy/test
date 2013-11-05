<?php
session_start();
require_once("twitteroauth.php");
$consumer_key='1PtcA9DRyEKyX0Va3rXpA';
$consumer_secret='wkQfSi2xCikh70a4csvCYkm7cgnl9HiM4TtOOpaNPB8';

	if(isset($_SESSION['oauth_verifier']) ){
		$verifier = $_SESSION['oauth_verifier'];
	}else{
		if( isset( $_GET['oauth_verifier'] )){
			$verifier = $_GET['oauth_verifier'];
		}else{
			header("Location: login.php");
		}
	}
	//$verifier = isset($_SESSION['oauth_verifier']) ? $_GET['oauth_verifier'] : $_SESSION['oauth_verifier'];
error_log($verifier);
/*
		$to = new TwitterOAuth($consumer_key,$consumer_secret,$_SESSION['request_token'],$_SESSION['request_token_secret']);
		$access_token = $to->getAccessToken($verifier);
		$_SESSION['oauth_token']=$access_token['oauth_token'];
		$_SESSION['oauth_token_secret']=$access_token['oauth_token_secret'];
		$_SESSION['user_id']=$access_token['user_id'];
		$_SESSION['screen_name']=$access_token['screen_name'];

*/
if($_SESSION['access_token']==NULL && $_SESSION['access_token_secret']==NULL){
			header("Location: login.php");
}

		//$to = new TwitterOAuth($consumer_key,$consumer_secret,$_SESSION['request_token'],$_SESSION['request_token_secret']);
		$to = new TwitterOAuth($consumer_key,$consumer_secret,$_SESSION['access_token'],$_SESSION['access_token_secret']);

/*
		$access_token = $to->getAccessToken($verifier);
		if($access_token['oauth_token']==NULL && $access_token['oauth_token_secret']==NULL){
			header("Location: login.php");
		}else{
			$_SESSION['oauth_verifier']=$verifier;
			$_SESSION['oauth_token']=$access_token['oauth_token'];
			$_SESSION['oauth_token_secret']=$access_token['oauth_token_secret'];
			$_SESSION['user_id']=$access_token['user_id'];
			$_SESSION['screen_name']=$access_token['screen_name'];
		}
*/
//}

//$to = new TwitterOAuth($consumer_key,$consumer_secret,$_SESSION['request_token'],$_SESSION['request_token_secret']);
//$to = new TwitterOAuth($consumer_key,$consumer_secret,$_SESSION['access_token'],$_SESSION['access_token_secret']);

//$account = $to->get('account/verify_credentials');
//var_dump($account,true);
//$req = $to->OAuthRequest('https://api.twitter.com/1.1/statuses/user_timeline.json','GET',array('count'=>'10'));
//$req = $to->get('statuses/home_timeline');
//var_dump($req);

$user_id=$_SESSION['user_id'];
$screen_name=$_SESSION['screen_name'];

//$to->host ='https://api.twitter..com1.1/';
//$req = $to->OAuthRequest('https://api.twitter.com/1.1/statuses/user_timeline.json','GET',array('count'=>'10'));

echo "<html><head><title>top</title>
<script src='http://code.jquery.com/jquery-1.10.2.min.js'></script>
<script src='../js/tl.js'></script>
</head><body><p>こんにちは! ".$screen_name."さん</p><a href=\"./logout.php\">Logout</a>
<h1>TEST</h1>
<div id='box'></div>
</body></html>";
?>
