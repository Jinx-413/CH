define(['detailed', 'jquery', 'jquery-cookie'], function(detailed, $){
    function sc_msg(){
        //购物车数据
        $.ajax({
            type: 'get',
            url: '../data/detailed.json',
            success: function(result){
                result = result.data
                console.log(result);
                var cookieArr = JSON.parse($.cookie('jinx'), {path: '/html'});
                console.log(cookieArr);
                var newArr = [];
                if(cookieArr){
                    for(var i = 0; i < result.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(cookieArr[j].id == result[i].id){
                                result[i].num = cookieArr[j].num;
                                newArr.push(result[i]);
                            }
                        }
                    }
                    var sum = 0;
                    var str = ``
                    for(var i = 0; i < newArr.length; i++){
                        str += `<div class="tool-tips-row">
                        <p>
                            <a class="cart_url" target="_blank" id="#">${newArr[i].data}</a>
                        </p>
                        <h1 cnne="${newArr[i].id}">单价<span>${newArr[i].pay}</span>元<b>x ${newArr[i].num}</b><a href="javascript:;" id="del">删除</a><a href="" class="tool-goods-tips"></a>
                        </h1>
                    </div>`;
                    sum += parseInt(newArr[i].pay) * newArr[i].num
                    }
                    $('#totalPrice').html(`￥${sum}.00`);
                    $('.tool-container-tips-warp').show();
                    $('.tool-container-tips-warp').html(str);
                    $('.tips-nogoods').hide();
                    $('.tool-goods-pay').show();

                    //删除商品
                    $('.tool-container-tips-warp').on('click', '#del', function(){
                        //页面数据清除
                        $(this).closest('.tool-tips-row').remove();
                        //cookie数据清除
                        for(var i = 0; i < cookieArr.length; i++){
                            if(cookieArr[i].id == $(this).parent('h1').attr('cnne')){
                                cookieArr.splice(i, 1);
                            }
                        }
                        $.cookie('jinx', JSON.stringify(cookieArr), {
                            expires: 7,
                            path: '/'
                        })
                        detailed.sc_num();
                        sc_msg();
                        dataDownload();
                        if(cookieArr.length == 0){
                            $('.tips-nogoods').show();
                            $('.tool-goods-pay').hide();
                            $('.tool-container-tips-warp').hide();
                        }
                    })
                    if(cookieArr.length == 0){
                        $('.tips-nogoods').show();
                        $('.tool-goods-pay').hide();
                        $('.tool-container-tips-warp').hide();
                    }

                }
               
                console.log(newArr)

            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    function dataDownload(){
        $.ajax({
            type: 'get',
            url: '../data/detailed.json',
            success: function(result){
                result = result.data;
                var cookieArr = JSON.parse($.cookie('jinx'), {path: '/html'});
                var newArr = [];
                if(cookieArr){
                    for(var i = 0; i < result.length; i++){
                        for(var j = 0; j < cookieArr.length; j++){
                            if(cookieArr[j].id == result[i].id){
                                result[i].num = cookieArr[j].num;
                                newArr.push(result[i]);
                            }
                        }
                    }
                    var str = ``
                    for(var i = 0; i < newArr.length; i++){
                        str += `<div class="car-item-ls" id="cart_item_${newArr[i].id}" jjcn = "${newArr[i].id}">
                        <!--商品块1-->

                    <div class="car-item-deal">
                        <div class="car-check-box">
                            <input type="checkbox" id="cart_id_${newArr[i].id}">

                        </div>

                        <style>
                            .car-sp-lf li{float: left; margin: 5px 3px;}
                            .car-sp-lf ul{margin:6px;position: relative;}
                            .car-sp-lf{height: 38px; line-height: 38px; padding-left:12px;}
                            .car-sp-lf li b{padding:2px 5px; cursor: pointer;}
                            .car-sp-lf li b.car-green{background: #30c463;}
                            .car-sp-lf li div{position: absolute; top:25px; left:2px; width: 400px;height: 200px;  background: #fff;-moz-opacity:1;   -khtml-opacity: 1;  opacity:1;-webkit-box-shadow: 0 0px 7px rgba(0,0,0,0.3);-moz-box-shadow: 0 0px 7px rgba(0,0,0,0.3);box-shadow: 0 0px 7px rgba(0,0,0,0.3);display: none;z-index:9999;}
                        </style>
                        <div class="car-deal-rt">

                            <!--参加活动的信息-->
                            <div class="car-deal-top">
                                <div class="car-sp-lf">
                                                                         <!--促销活动内容 END-->
                                                                        </div>
                                <div class="car-opt-bk">
                                    <a href="javascript:;" class="opt-like " id="sc_${newArr[i].id}"></a>
                                    <a href="javascript:;" class="opt-del"></a>
                                </div>
                            </div>
                            <!--参加活动的信息 END-->

                            <!--购买商品详情-->
                            <div class="car-deal-sp clearfix">
                                <a href="#" class="car-deal-pc">
                                 <img src="${newArr[i].img1[0]}">
                                </a>
                                 <div class="car-deal-name ">
                                     <a href="" class="h3">${newArr[i].data}</a>
                                </div>
                                <div class="car-deal-price">
                                    <p class="del-price"></p>
                                    <p class="now-price">
                                        单价<span id="item${newArr[i].id}_price">
                                                ${newArr[i].pay}</span>元
                                    </p>
                                    
                                    <p class="rec-price">
                                                                                </p>
                                </div>
                                <input class="r3code" type="hidden">
                                <div class="car-deal-qt">
                                    <label>数量</label>
                                    <div class="car-quantity-form">
                                                                                    <a href="javascript:;" class="decrement"></a>
                                        <input id="input_item_${newArr[i].id}" value="${newArr[i].num}" type="text" class="text w20">
                                        <a href="javascript:;" class="increment"></a>
                                    </div>
                                    <input type="hidden" id="item${newArr[i].id}_subtotal" value="${newArr[i].pay}">

                                </div>
                                <p class="car-item-sta">
                                    <!--<span class="goods-Ntotal_"></span>元 &nbsp; &nbsp;-->
                                    <span id="show_sto_msg11880161">
                                    有货                                    </span>
                                </p>

                          </div>

                            <!--购买商品详情 END-->
                        </div>
                    </div>

                    </div>`;
                    }
                    $('#cart_goods_info').html(`<div class="car-con-top clearfix">
					<div class="lf clearfix">
						<div class="car-all-check er">
							<input type="checkbox" id="car_all_check">
						</div>
						<p class="car-lf-sp">
							全选<span id="total_num">${newArr.length}</span>种商品
						</p>
					</div>
					<p class="rt-sp">
						<span>0</span>种商品已失效
					</p>
				</div>${str}`);

                    //删除商品
                    $('#cart_goods_info').on('click', '.opt-del', function(){
                        //页面数据清除
                        $(this).closest('.car-item-ls').remove();
                        if($('.tool-tips-row').find('h1').attr('cnne') == $(this).closest('.car-item-ls').attr('jjcn')){

                        }
                        //cookie数据清除
                        var cookieArr = JSON.parse($.cookie('jinx'), {path: '/html'});
                        for(var i = 0 ; i < cookieArr.length; i++){
                            if(cookieArr[i].id == $(this).closest('.car-item-ls').attr('jjcn')){
                                cookieArr.splice(i, 1);
                            }
                        }
                        $.cookie('jinx', JSON.stringify(cookieArr), {
                            expires: 7,
                            path: '/'
                        })
                        detailed.sc_num();
                        sc_msg();
                        sum();
                        dataDownload();
                    })

                    //加减商品
                    $('.car-quantity-form').on('click', 'a', function(){
                        var id = $(this).closest('.car-item-ls').attr('jjcn');
                        var cookieArr = JSON.parse($.cookie('jinx'), {path: '/html'});
                        var index = cookieArr.findIndex(item => item.id == id);
                        if($(this).attr('class') == 'increment'){
                            cookieArr[index].num++;
                        }else{
                            if(cookieArr[index].num == 1){
                                cookieArr[index].num = 1
                            }else{
                                cookieArr[index].num--;
                            }
                        }
                        $(this).siblings('input').val(`${cookieArr[index].num}`)
                        $.cookie('jinx', JSON.stringify(cookieArr), {
                            expires: 7,
                            path: '/'
                        })
                        sc_msg();
                        detailed.sc_num();
                        sum();
                    })
                    //选中
                    $('.car-check-box').click(function(){
                        $(this).toggleClass('car-checked');
                        sum();
                        xz();
                    })
                    //全选
                    $('#car_all_check').click(function(){
                        $(this).parent().toggleClass('car-checked');
                        if($(this).parent().is('.car-checked')){
                            $('.car-check-box').addClass('car-checked')
                        }else{
                            $('.car-check-box').removeClass('car-checked')
                        }
                        sum();
                    })

                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    function sum(){
        var num = 0;
        var num2 = 0;
        $('.car-item-ls').each(function(){
            if($(this).find('.car-check-box').is('.car-checked')){
                //获取单价
                var dj = $(this).find('span').html();
                //获取物品数量
                var sl = $(this).find('.text').val();
                //合计
                var hj = dj * sl;
                num += hj;
                num2 += parseInt(sl);
            }
        })
        $('#goods_num').html(num2);
        $('#cartTotal').html(num + '.00');
    }

    function xz(){
        //单选 -- 全选中
        var choose = $('.car-check-box');
        var choose_on = $('.car-item-ls').find('.car-checked');
        if(choose.length == choose_on.length){
            $('#car_all_check').parent().addClass('car-checked')
        }else{
            $('#car_all_check').parent().removeClass('car-checked')
        }
    }
    function btn(){
        $('#next_submit2').click(function(){
            if($.cookie('token')){
                if($('#goods_num').html() == 0){
                    $('#append_parent').html(`
                    <div class="dialog_body" id="fwin_dialog" style="background: #fff;margin-top: -100px;position: fixed; z-index: 1701; left: 559.5px; top: 50%;" initialized="true">
                <style type="text/css">object{visibility:hidden;}</style>
                <h3 class="dialog_head" style="position: relative;z-index: auto;text-align: center;border: none;">
                    <span class="dialog_title">
                        <span class="dialog_title_icon">提示信息</span>
                    </span>
                    <span class="dialog_close_button" id="fwin_dialog_close" onclick="hideMenu('fwin_dialog', 'dialog')" title="关闭">X</span>
                </h3>
                <div class="eject_con">
                    <div class="dialog_message_contents">
                        <i class="alert_error"></i>
                        请购买至少1件商品
                    </div>
                </div>
                <div class="dialog_buttons_bar">
                    <time class="countdown">
                        <i class="icon-time"></i>
                        2 秒后页面跳转
                    </time>
                </div>
            </div>
            <div id="fwin_dialog_cover" style="position: fixed; z-index: 1700; top: 0px; left: 0px; width: 100%; height: 1342px; opacity: 1; background-color: rgba(0, 0, 0, 0.6);;">
            </div>`);
                    setTimeout(function(){
                        $('#append_parent').html("");
                    }, 2000);
                    $('#fwin_dialog_close').click(function(){
                        $('#append_parent').html("");
                    })
                    
                }else{
                    alert('OK!结算成功，jinx爱你哦');
                }
            }else{
                location.assign('login.html');
            }
        })
    }
   

    return {
        dataDownload: dataDownload,
        sc_msg: sc_msg,
        btn: btn
        // all: all
    }
})

