<?php 
	header('content-type:text/html;charset="utf-8"');

	$responseData = array("code" => 0, "message" => '');

	$phone = $_POST['phone'];
	$password = $_POST['password'];

	if(!$password){
		$responseData['code'] = 1;
		$responseData['message'] = '请输入密码';
		echo json_encode($responseData);
		exit;
	}


	//打开数据库
	$link = mysql_connect('localhost', 'root', '000413');

	//判断是否连接成功
	if(!$link){
		$responseData['code'] = 2;
		$responseData['message'] = '服务器忙';
		echo json_encode($responseData);
		exit;
	}

	//选择字段集
	
	mysql_set_charset('utf-8');

	//选择数据库
	
	mysql_select_db('ch');

	//准备sql语句
	
	$sql = "select * from user where phone = {$phone}";

	//发送sql语句
	$res = mysql_query($sql);

	//取一条数据
	$row = mysql_fetch_assoc($res);

	if($row){
		$responseData['code'] = 3;
		$responseData['message'] = '手机号已经被注册';
		echo json_encode($responseData);
		exit;
	}


	$newps = md5(md5(md5($password).'jinx').'cs');

	//再次准备sql语句
	$sql2 = "insert into user (phone,password) values('{$phone}','{$newps}')";

	//发送sql语句
	$res = mysql_query($sql2);

	if(!$res){
		$responseData['code'] = 4;
		$responseData['message'] = '注册失败';
		echo json_encode($responseData);
		exit;
	}else{
		$responseData['message'] = '√';
		echo json_encode($responseData);
	}

	//关闭数据库
	mysql_close($link);
 ?>