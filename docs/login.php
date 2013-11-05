<?php
session_start();
require_once("twitteroauth.php");
$consumer_key='1PtcA9DRyEKyX0Va3rXpA';
$consumer_secret='wkQfSi2xCikh70a4csvCYkm7cgnl9HiM4TtOOpaNPB8';
$to = new TwitterOAuth($consumer_key,$consumer_secret);
$tok = $to->getRequestToken("http://127.0.0.1/work/docs/hoge.php");
//$tok = $to->getRequestToken("http://127.0.0.1/work/docs/twtest.php");
var_export($tok,true);
$_SESSION['request_token']=$token=$tok['oauth_token'];
$_SESSION['request_token_secret']=$tok['oauth_token_secret'];

$url=$to->getAuthorizeURL($token);
echo "<html><head><title>login</title></head><body><a href=\"".$url."\">Login</a></body></html>";
?>
