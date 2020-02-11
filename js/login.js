define(["jquery","jquery-cookie"], function($){
    function login(){
        //选项卡操作
        var aBtns = $(".content-header").find("div");
        var aDivs = $('.content').find('form');
        aBtns.click(function(){
            aBtns.attr('class', 'cheader gray');
            aDivs.attr('class', 'user').eq($(this).index()).attr('class', 'user show')
            $(this).attr('class','cheader');
        })

        //注册
        $('#register').click(function(){
            location.assign('register.html')
        })
    }
    
    function userCode(){
        //用户名密码操作
        $('#login1').click(function(){
            $.ajax({
                type: 'get',
                url: '../php/login.php',
                data: {
                    phone: $('#phone1').val(),
                    password: $('#password').val(),
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code == 1){
                        $('#accountTipsDiv1').html(obj.message);
                        $('#accountTipsDiv2').html('');
                    }else if(obj.code == 0){
                        location.assign('../index.html');
                        $.cookie('token', $('#phone1').val(), {
                            path: '/'
                        })
                    }else{
                        $('#accountTipsDiv1').html('');
                        $('#accountTipsDiv2').html(obj.message);
                    }
                },
                error: function(msg){
                    console.log(msg);
                }
            })
        })
    }
    function phone(){
        //验证手机号是否正确
        $('#p1').keyup(function(){
            if(!/^1[3456789]\d{9}$/.test(this.value)){
                $('#accountTipsDiv3').html('请输入正确手机号')
            }else{
                codePhone();
                $('#accountTipsDiv3').html('')
                //后台验证
            }
        })
        
    }
    function codePhone(){
        //手机验证码登录操作
        $('#p1').blur(function(){
            $.ajax({
                type: 'get',
                url: '../php/loginPhone.php',
                data: {
                    phone: $(this).val()
                },
                success: function(result){
                    var obj = JSON.parse(result);
                        $('#accountTipsDiv3').html(obj.message);
                    
                },
                error: function(msg){
                    console.log(msg);
                }
            });
        });
    }
    function b2(){
        //获取随机验证码
            $('#btn2').click(function(){
                if($('#accountTipsDiv3').html() == '√'){
                    var a = abcNumCode(6);
                    $.cookie('phone', a);
                    alert(`您的验证码：${a}请收好您的验证码，一次有效哦！！！`);
                }
            }) 
        
            $('#p2').blur(function(){
                if($('#p2').val().toLowerCase() != $.cookie('phone').toLowerCase()){
                    $('#accountTipsDiv4').html("验证码有误，请重新输入");
                }else{
                    $('#accountTipsDiv4').html("");
                }
            })
             
    }
    function b3(){
        //提交
        $('#login2').click(function(){
            if($('#accountTipsDiv3').html() == '√' && $('#accountTipsDiv4').html() == ''){
                $.cookie('token', $('#p1').val(), {
                    path: '/'
                })
                location.assign('../index.html');
                $.cookie('phone', null);
            }else{
                if(!$('#p1').val()){
                    $('#accountTipsDiv3').html("手机号不能为空");
                }else if($('#p2').val().toLowerCase() != $.cookie('phone').toLowerCase()){
                    $('#accountTipsDiv4').html("验证码有误，请重新输入");
                }else{
                    $('#accountTipsDiv4').html("");
                }
            }
        })
    }
    function abcNumCode(n){
        //字母数字组合验证码
        var arr = [];
        for(var i = 0; i < n; i++){
            var tep = parseInt(Math.random() * 123);
            if(tep >= 0 && tep <= 9){
                arr.push(tep);
            }else if(tep >= 65 && tep <= 90 || tep >= 97 && tep <= 122){
                arr.push(String.fromCharCode(tep));
            }else{
                i--;
            }
        }
        return arr.join('');
    }

    return {
        login: login,
        userCode: userCode,
        phone: phone,
        b2: b2,
        b3: b3
    }
})

    