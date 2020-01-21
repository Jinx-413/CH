<?php 
	header('content-type:text/html;charset="utf-8"');

	//定义一个统一的返回格式
	
	$responseData = array("code" => 0, "message" => '');

	$phone = $_GET['phone'];
	$password = $_GET['password'];

	if(!$phone){
		$responseData['code'] = 1;
		$responseData['message'] = '请输入用户名';
		echo json_encode($responseData);
		exit;
	}
	if(!$password){
		$responseData['code'] = 2;
		$responseData['message'] = '请输入密码';
		echo json_encode($responseData);
		exit;
	}

	$link = mysql_connect('localhost', 'root', '000413');

	if(!$link){
		$responseData['code'] = 3;
		$responseData['message'] = '服务器忙';
		echo json_encode($responseData);
		exit;
	}

	mysql_set_charset('utf-8');

	mysql_select_db('ch');


	$newps = md5(md5(md5($password).'jinx').'cs');

	$sql = "SELECT * FROM user WHERE phone='{$phone}' AND password='{$newps}'";

	$res = mysql_query($sql);

	$row = mysql_fetch_assoc($res);

	if(!$row){
		$responseData['code'] = 4;
		$responseData['message'] = '账号或密码错误,或账号被禁用';
		echo json_encode($responseData);
		exit;
	}else{
		$responseData['message'] = '√';
		echo json_encode($responseData);
	}

	mysql_close($link);
 ?>