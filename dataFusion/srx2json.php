<?php
	$a = set_time_limit(0);
	ini_set('max_execution_time', 0);
	ini_set('display_errors', 1);
	if($_REQUEST['su3d']) {ini_set('display_errors', 1);}
	$url = $_GET['url'];
	$query = $_GET['query'];
	$par1 = $_GET['par1'];$par2 = $_GET['par2'];  $par3 = $_REQUEST['par3'];$par4 = $_GET['par4']; 
	$cacheFile = 'cache/'.md5($url.'&query='.$query);
	
	//$error_msg = json_encode(array('false', $name, $domid));


if(!is_file($cacheFile)){
		
		$ch = curl_init($url.'?query='.urlencode($query));
		$fp = fopen ($cacheFile, "w");
		curl_setopt ($ch, CURLOPT_FILE, $fp);
		curl_setopt ($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_ENCODING, 'text/plain');
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/sparql-results+json; charset=UTF-8'));
		curl_exec ($ch);
		curl_close ($ch);
		fclose ($fp);
		
	}
	
	$b = file_get_contents($cacheFile);
	echo json_encode(array(json_decode($b), $par1, $par2, $par3));

exit;
	
?>