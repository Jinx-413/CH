define(['jquery',"jquery-cookie"],function($){

    function phone(){
        //验证手机号是否正确
        $('#phone').keyup(function(){
            if(!/^1[3456789]\d{9}$/.test(this.value)){
                $('#phoneCode').html('请输入正确手机号')
            }else{
                phonecode();
                $('#phoneCode').html('')
                //后台验证
            }
        })
        
    }
    function phonecode(){
        // 手机号是否注册验证
        $('#phone').blur(function(){
            $.ajax({
                type: 'post',
                url:'../php/registerPhone.php',
                data:{
                    phone: $(this).val(),
                },
                success: function(result){
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $('#phoneCode').html(obj.message);
                    }

                },error: function(msg){
                    console.log(msg);
                }
            })
        })
    }
    function getAbcCode(){
        //获取随机验证码
            $('#btn2').click(function(){
                if($('#phoneCode').html() == '' && $('#phone').val() != ''){
                    var a = abcNumCode(6);
                    $.cookie('phone', a);
                    alert(`您的验证码：${a}请收好您的验证码，一次有效哦！！！`);
                }
            }) 
        
            $('#code').blur(function(){
                if($('#code').val().toLowerCase() != $.cookie('phone').toLowerCase()){
                    $('#abcCode').html("验证码有误，请重新输入");
                }else{
                    $('#abcCode').html("");
                }
            })
             
    }
    function btn1(){
        //第一层验证
        $('#btn1').click(function(){
            if($('#code').val() == $.cookie('phone') && $('#phoneCode').html() == "" && $('#checkId').attr('src') == '../images/login/ok.png'){
                $('#cd1').removeClass('show').next('form').addClass('show');
                $('#headerStep2Div').attr('class', 'heightlightDivColor').find('img').attr('src', '../images/login/register_ico_2_focus.png');
                $.cookie('phoneName', $('#phone').val());
                $.cookie('phone', null);
            }else{
                if(!$('#phone').val()){
                    $('#phoneCode').html("手机号不能为空");
                }else if($('#code').val() != $.cookie('phone')){
                    $('#abcCode').html("验证码有误，请重新输入");
                }else{
                    $('#abcCode').html("请勾选注册协议");
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

    function b(){
        //协议勾选
        var isThis = true;
        $('#checkId').click(function(){
            if(isThis){
                $(this).attr('src', '../images/login/ok_normal.png')
                isThis = false;
            }else{
                $(this).attr('src', '../images/login/ok.png')
                isThis = true;
            }
        })
    }
    function password(){
        //设置密码
        $('#password').keyup(function(){
            if($(this).val().length >= 0 && $(this).val().length < 8){
                $('#ps').html('密码复杂度不够')
            }else{
                if(/^\d+$/.test($(this).val()) || /^[a-z]+$/.test($(this).val()) || /^[A-Z]+$/.test($(this).val())){
                    $('#ps').html('密码复杂度不够')
                }else{
                    $('#ps').html('')
                }
            }
        });

        $('#rePassword').keyup(function(){
            if($(this).val() != $('#password').val()){
                $('#reps').html('两次密码不一致')
            }else{
                $('#reps').html('')
            }
        })
    }

    function btn2(){
        //提交密码
        $('#btn3').click(function(){
            if($('#ps').html() == '' && $('#reps').html() == '' && $('#password').val() != '' && $('#rePassword').val() != ''){
                $.ajax({
                    type: 'post',
                    url: '../php/register.php',
                    data: {
                        phone: $.cookie('phoneName'),
                        password: $('#password').val()
                    },
                    success: function(result){
                        var obj = JSON.parse(result);
                        if(obj.code){
                            $('#ps').html(obj.message);
                        }else{
                            $('#cd2').removeClass('show').next('form').addClass('show');
                            $('#headerStep3Div').attr('class', 'heightlightDivColor').find('img').attr('src', '../images/login/register_ico_3_focus.png');
                            $.cookie('phoneName', null);
                            setTimeout(function(){
                                location.assign('login.html');
                            }, 3000)
                        }
                    },
                    error: function(msg){
                        console.log(msg)
                    }
                })
            }else{
                if(!$('#password').val()){
                    $('#ps').html('请输入密码')
                }else if(!$('#rePassword').val()){
                    $('#reps').html('请输入确认密码')
                }
            }
        })
    }

    return {
        phone: phone,
        abcNumCode: abcNumCode,
        phonecode: phonecode,
        getAbcCode: getAbcCode,
        btn1: btn1,
        b:b,
        password:password,
        btn2: btn2
    }
})