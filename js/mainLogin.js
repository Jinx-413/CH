console.log("执行成功");

//配置当前login.html引入的文件
require.config({
    paths: {
        'jquery': 'jquery-1.10.1.min',
        "jquery-cookie": "jquery.cookie",
        'login': 'login',
    },
    shim:{
        //设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
    }
});

require(['login'], function(login){
    $(function(){
        login.login();
        $('#login1, #login2').click(function(ev){
            ev.preventDefault();
        })
        $('#btn2').click(function(ev){
            ev.preventDefault();
        }).mousedown(function(){
            $(this).css({background: '#ccc'});
        }).mouseup(function(){
            $(this).css({background: '#fff'});
        });
        login.userCode();
        login.phone();
        login.b2();
        login.b3();
    })
   
})