define(['jquery', 'jquery-cookie'], function($){
    function dataDownload(){
        //获取购物车数据
        $.ajax({
            type: 'get',
            url: '../data/detailed.json',
            success: function(result){
                result = result.data;
                var i = getParam('id');
                var arr = result[i];
                $('#success_cart_image').attr('src',arr.img1[0]);
                $('#goodsname').html(arr.data);
                $('#goodsname').attr('title', arr.data);
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
        dataDownload: dataDownload,
    }
})