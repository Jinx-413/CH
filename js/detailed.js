define(['jquery'],function($){
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
            var l = ev.clientX - $(this).offset().left - 102;
            var t = ev.clientY - $(this).offset().top;

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
                console.log(result[id]);
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

    return {
        choose: choose,
        imgShow: imgShow,
        bigImg: bigImg,
        gps: gps,
        chooseDown: chooseDown,
        dataDownload: dataDownload,
    }
})