<?php
session_start();
require_once("twitteroauth.php");
$consumer_key='1PtcA9DRyEKyX0Va3rXpA';
$consumer_secret='wkQfSi2xCikh70a4csvCYkm7cgnl9HiM4TtOOpaNPB8';
if($_SESSION['oauth_token']==NULL && $_SESSION['oauth_token_secret']==NULL){
//	header("Location: login.php");
	echo json_encode(array('error'=>'not authorized.'));
	exit(0);
}
/*
if($_GET['type']=='init'){
	if($_GET['bc']=='hoge'){
		$data=array('ot'=>$_SESSION['oauth_token'],
		'ots'=>$_SESSION['oauth_token_secret']);
		echo json_encode($data);
		exit(0);
	}
}
*/
//error_log(var_export($_SESSION,true));

$to = new TwitterOAuth($consumer_key,$consumer_secret,$_SESSION['access_token'],$_SESSION['access_token_secret']);
//$to->host ='https://api.twitter..com1.1/';
//$req = $to->OAuthRequest('https://api.twitter.com/1.1/statuses/user_timeline.json','GET',array('count'=>'10'));
$req = $to->OAuthRequest('https://api.twitter.com/1.1/followers/ids.json','GET',array('count'=>'10'));

//$account = $to->get('account/verify_credentials');
//error_log(var_export($account,true));
//error_log(var_export($to,true));
//$req = $to->get('statuses/home_timeline');
//error_log(print_r($req,true));

if(isset($_GET['callback'])){
	echo $_GET['callback'].'('.$req.')';
}else{
	echo $req;
}
?>
