define(['jquery', 'jquery-cookie'],function($){
    function choose(){
        //图片点击左右移动
        $('.pro-ditem-items').find('.item-next').click(function(){
            var x = parseInt($('#daxiaocontrol').css("left"));
            if($('#daxiaocontrol').find('.m0').offset().left <= 550){
                $('#daxiaocontrol').css({
                    left: -($('#daxiaocontrol').find('li').size() - 5) * 96,
                })
            }else{
                $('#daxiaocontrol').css({
                    left: x -= 96,
                })
            }           
        })
        
        $('.pro-ditem-items').find('.item-pre').click(function(){
            var x = parseInt($('#daxiaocontrol').css("left"));
            if($('#daxiaocontrol').find('li:first').offset().left >= 165){
                $('#daxiaocontrol').css({
                    left: 0,
                })
            }else{
                $('#daxiaocontrol').css({
                    left: x += 96,
                })
            }            
        })    
    }
    function imgShow(){
        //滑入图片变换图片效果
        $('#daxiaocontrol').on('mouseenter', 'li', function(){
            $(this).find('a').addClass('pro-cur').parent().siblings().find('a').removeClass('pro-cur');
            var isImg = $(this).find('a img').attr('src');
            $('#ProDiemCp').find('img').attr('src', isImg);
            $('#ProDiemCp').siblings('.big-pic').find('img').attr('src', isImg);
        })
    }
    function bigImg(){
        $('#ProDiemCp').mouseenter(function(){
            $(this).siblings('.big-pic').show();
            $(this).find('.big-mirror').show();

        }).mouseleave(function(){
            $(this).siblings('.big-pic').hide();
            $(this).find('.big-mirror').hide();

        }).mousemove(function(ev){
            var l = ev.pageX - $(this).offset().left - 102;
            var t = ev.pageY - $(this).offset().top - 102;

            if(l <= 0){
                l = 0;
            }
            if(t <= 0){
                t = 0;
            }
            if(l >= 306){
                l = 306;
            }
            if(t >= 306){
                t = 306;
            }
            $('.big-mirror').css({
                left: l,
                top: t,
            })
            $('.big-pic').find('img').css({
                left: -2.5 * l,
                top: -2.5 * t,
            })
        })
    }
    function gps(){
        $('#receiveAddr0').hover(function(){
            $(this).find('.address-select-content').show();
        }, function(){
            $(this).find('.address-select-content').hide();
        })
    }
    function chooseDown(){
        $('.pro-ditem-cs').on('click', 'a', function(){
            // alert(($(this).index()) / 2);
            $(this).addClass('sel').siblings('a').removeClass('sel');
            $(this).parent().siblings('.pro-ditem-tab').find('.pro-ditem-tabcon').eq($(this).index() / 2).show().siblings().hide();
            $('.pro-ditem-comment').show();
        })
    }
    function dataDownload(){
        //数据获取
        $.ajax({
            type: 'get',
            url: '../data/detailed.json',
            success: function(result){
                result = result.data;
                var id = getParam('id');
                //title修改
                document.title = result[id].data;
                //a title修改
                $('.pro-detail').find('#a').html(result[id].name);
                $('.pro-ditem-name').find('h2').html(`${result[id].data} <p>${result[id].p}</p>`)
                $('#goodsPrice').html(`￥${result[id].pay}`);
                var arr = result[id].img1;
                var arr2 = result[id].img2;
                var str = ``;
                var str2 = ``;
                for(var i = 0; i < arr.length; i++){
                    str += `
                    <li>
                            <a href="javascript:void(0)" class="item-s">
                            <img src="${arr[i]}" alt="" width="84" height="84"></a>
                    </li>
                    `
                }
                for(var i = 0; i < arr2.length; i++){
                    str2 += `
                    <img title="" width="100%" alt="" src="${arr2[i]}" style="display: inline;">
                    `
                }
                $('.pro-ditem-detail').html(str2);
                $('#ProDiemCp').find('img').attr('src', arr[0]);
                $('#daxiaocontrol').html(str);
                $('.big-pic').find('img').attr('src', arr[0]);
                $("#daxiaocontrol li:first").addClass("pro-cur");
                $("#daxiaocontrol li:last").addClass("m0");
                var a = 95 * $('#daxiaocontrol').find('li').size();
                $('#daxiaocontrol').attr('width', a);
                $('#ddData').html(result[id].data);
                $('#ddName').html(result[id].name);
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    function getParam(name){
        //获取导航栏信息
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);
        //匹配目标的参数
        if(r != null) return unescape(r[2]);return null;
    }

    function shopping(){
        //加入购物车
        var id = getParam('id');
        //cookie
        //当不存在的时候
        $('#pro-ditem-addin').click(function(){
            $(this).attr('href', `shopping.html?id=${id}`);
            var first = $.cookie('jinx') == null ? true : false;
            if(first){
                var arr = [{id: id, num: parseInt($('#count_value').val())}];
                $.cookie('jinx', JSON.stringify(arr),{
                    expires: 7,
                    path: '/'
                })
            }else{
                //如果之前存在
                var cookieStr = $.cookie('jinx');
                var cookieArr = JSON.parse(cookieStr);
                var same = false;
                for(var i = 0; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if(!same){
                    var obj = {id: id, num: parseInt($('#count_value').val())};
                    cookieArr.push(obj);
                }
                $.cookie('jinx', JSON.stringify(cookieArr), {
                    expires: 7,
                    path: '/'
                })
              
            }
            console.log($.cookie('jinx'));
            sc_num();
            sc_msg();
        })
    }

    function sc_num(){
        //购物车商品数量计算
        var cookieStr = $.cookie('jinx', {path:'/html'});
        var sum = 0;
        if(cookieStr){
            var cookieArr = JSON.parse(cookieStr);

            for(var i = 0; i < cookieArr.length; i++){
                sum += cookieArr[i].num;
            }
            $('#floadt_cart_totalNum').show();
            $('#floadt_cart_totalNum').html(sum);
            $('#mycartNum').html(sum);
            $('#totalNum').html(sum);
        }else{
            $('#floadt_cart_totalNum').show();
            $('#floadt_cart_totalNum').html(0);
            $('#mycartNum').html(0);
        }
    }
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
                        sc_num();
                        sc_msg();
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
    function sc_msgg(){
        //购物车数据
        $.ajax({
            type: 'get',
            url: 'data/detailed.json',
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
                        sc_num();
                        sc_msgg();
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
    function add(){
        var num = $('#count_value').val();
        $('#nextCount').click(function(){
            $('#count_value').val(++num);
        })
        $('#preCount').click(function(){
            
            if(num == 1){
                $('#count_value').val(1);
            }else{
                $('#count_value').val(--num);
            }
        })
    }

    
    return {
        choose: choose,
        imgShow: imgShow,
        bigImg: bigImg,
        gps: gps,
        chooseDown: chooseDown,
        dataDownload: dataDownload,
        shopping: shopping,
        sc_num: sc_num,
        sc_msg: sc_msg,
        sc_msgg: sc_msgg,
        add: add,
    }
})