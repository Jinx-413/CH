console.log("加载成功");

require.config({
    paths:{
        'jquery':'jquery-1.10.1.min',
        "jquery-cookie": "jquery.cookie",
        'register': 'register',
        'ajax': 'ajax'
    },
    shim:{
        //设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
    }
})

require(['register'], function(register){
    $(function(){
        //取消button默认样式
        $('#btn2').click(function(ev){
            ev.preventDefault();
        }).mousedown(function(){
            $(this).css({background: '#ccc'});
        }).mouseup(function(){
            $(this).css({background: '#fff'});
        });
        $('#btn1,#btn3').click(function(ev){
            ev.preventDefault();
        })
        $('#assign,#login').click(function(){
            location.assign('login.html');
        })
        register.phone();
        register.getAbcCode();
        register.btn1();
        register.b();
        register.password();
        register.btn2();
    })
})