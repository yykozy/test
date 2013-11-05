<?php
session_start();
require_once("twitteroauth.php");
$consumer_key='1PtcA9DRyEKyX0Va3rXpA';
$consumer_secret='wkQfSi2xCikh70a4csvCYkm7cgnl9HiM4TtOOpaNPB8';
$verifier = $_GET['oauth_verifier'];

$to = new TwitterOAuth($consumer_key,$consumer_secret,$_SESSION['request_token'],$_SESSION['request_token_secret']);
$access_token = $to->getAccessToken($verifier);
//var_dump($access_token);

//$account = $to->get('account/verify_credentials');
//error_log(var_export($account,true));
//$req = $to->get('statuses/home_timeline');
//error_log(print_r($req,true));
error_log("hoge");
$_SESSION['access_token']=$access_token['oauth_token'];
$_SESSION['access_token_secret']=$access_token['oauth_token_secret'];
$_SESSION['user_id']=$access_token['user_id'];
$_SESSION['screen_name']=$access_token['screen_name'];
//var_dump($_SESSION);
header("Location: twtest.php");
?>
