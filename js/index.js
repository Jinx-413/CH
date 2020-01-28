define(['jquery'], function($){
    function header(){
        
        //头部登录 二维码 购物车 淡入淡出效果
        $(".motool-tool").mouseenter(function(){
            $(this).find('.tool-myCQ-tips').stop(true,true).slideDown(800);
            $(this).find(".hcyp-ewm-img").stop(true,true).slideDown(500);
            $(this).find(".tool-container-tips").stop(true,true).slideDown(500);
        }).mouseleave(function(){
            $(this).find('.tool-myCQ-tips').stop(true,true).slideUp(800);
            $(this).find(".hcyp-ewm-img").stop(true,true).slideUp(500);
            $(this).find(".tool-container-tips").stop(true,true).slideUp(500);

        })
        
    }
    function navDownload(){
        //导航栏子菜单数据的获取和操作
        //获取数据
        $.ajax({
            type: 'get',
            url: 'data/nav.json',
            success: function(result){
                result = result.nav;
                var str = ``;
                for(var i = 0; i < result.length; i++){
                    str = `<a href="">${result[i].name}</a>`;
                    $(`#n${i}`).html(str);
                    str = ``;
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })

        $.ajax({
            type: 'get',
            url: 'data/head.json',
            success: function(result){
                var j = 0;
                for(var arr in result){
                    str =``;
                    for(var i = 0; i < result[arr].length; i++){
                        str += `
                        <div class="home-sub-box">
                        <a href="#" target="_blank" class="home-goods-img"><img class="lazy-zt" src="${result[arr][i].img}"></a>
                        <p><a href="#" target="_blank" title="${result[arr][i].data}">${result[arr][i].data}</a></p>
                        <h1>￥${result[arr][i].pay}</h1>
                        <div class="home-sub-line"></div>
                        </div>
                        `
                        
                    }
                    $(`#div${j}`).html(str);
                    j++;
                }
                $('#div5').find('h1').html('');
                
            },
            error: function(msg){
                console.log(msg);
            }
        });

    }
    function nav(){
        
        var isNav = false;
        $('.nav ul .cur').siblings().mouseenter(function(){
            if(!isNav){
                isNav = true;      
                $(this).find('.home-nav-menu a').css('color','red')  
                $(this).find(".home-nav-sub").stop(true).slideDown(600);
            }else{
                $(this).find('.home-nav-menu a').css('color', 'red').parents('li').siblings().find('.home-nav-menu a').css('color', '#000')
                $(this).find(".home-nav-sub").stop(true).show().parents('li').siblings().children('.home-nav-sub').stop(true).hide();

            }    
        });

        $('.nav ul').mouseenter(function(){         
            $(this).stop(true).show();
        }).mouseleave(function(){
            $(this).find(".home-nav-sub").stop(true).slideUp(300);
            $(this).find('.cur').siblings().find('.home-nav-menu a').css('color','#000');
            isNav = false
        })
           // 鼠标离开导航栏列表
        $('.nav ul').on('mouseleave', '.home-nav-sub', function(){
            $(this).stop().slideUp(300);
            isNav = false;
        });
    }
    function search(){
        //搜索框操作
        $.ajax({
            type: 'get',
            url: 'data/orignSearchList.json',
            success: function(result){
                result  = result.data
                var str = ``;
                for(var i = 0; i < result.length; i++){
                    str += `
                    <p><a href="${result[i].url}">${result[i].data}</a></p>
                    `
                }
                $('#orignSearchList').html(str);

                $('#searchInput').focus(function(){
                    $('#orignSearchList').show();
                    $(this).attr('placeholder', '');
                }).keyup(function(){
                    if($(this).val() == ''){
                        $('#orignSearchList').html(str);
                    }else{
                        $('#orignSearchList').html('');
                    }
                }).blur(function(){
                    $('#orignSearchList').hide();
                    $(this).attr('placeholder', 'Q6R');
                });
            },
            error: function(msg){
                console.log(msg);
            }
        })
        
    }
    //轮播图效果
    function bannerDownload(){
        $.ajax({
            type: 'get',
            url: 'data/banner.json',
            success: function(result){
                result = result.data;
                var str = ``;
                for(var i = 0; i < result.length; i++){
                    str += `
                    <a href="${result[i].url}" class="home-banner-img" id="ban${result[i].id}"><img src="${result[i].img}" alt=""></a>
                    `
                }           
                $('#b1').html(str);
                $('#ban0').css({
                    zIndex: 100
                });
                banner();
            },
            error: function(msg){
                console.log(msg)
            }
        })
    }
    function banner(){
        //取消a的默认样式
        $('#b2').find('a').click(function(ev){
            ev.preventDefault();
        });
        $('#b1').find('a').click(function(ev){
            ev.preventDefault();
        });
        var aBtns = $('#b2').find('li');
        var aLis = $('#b1').find('.home-banner-img');

        var isNow = 0;
        var timer = null;
        aBtns.click(function(){
            isNow = $(this).index();
            teb();
        })
       

        timer = setInterval(function(){
            isNow++;
            teb();
        }, 3000)

        //鼠标划入的时候
        $('#b1, #b2').hover(function(){
            clearInterval(timer);
        }, function(){
            timer = setInterval(function(){
                isNow++;
                teb();
            }, 3000)
        });
        function teb(){
            aBtns.removeClass('icur').eq(isNow).addClass('icur');
            aLis.fadeOut(600).eq(isNow).fadeIn(600);

            if(isNow == aLis.size()){
                aBtns.eq(0).addClass('icur');
                aLis.eq(0).fadeIn(600);
                isNow = 0;
            }

           
        }
        
    }

    function navTDownload(){
        //获取数据

        $.ajax({
            type: 'get',
            url: 'data/nav.json',
            success: function(result){
                result = result.navT;
                var str = ``;
                for(var i = 0; i < result.length; i++){
                    str += `
                    <a href="#" target="_blank">${result[i].name}</a><span></span>

                    `
                    $(`#nT${i}`).html(str);
                    str = ``;
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })

        $.ajax({
            type: 'get',
            url: 'data/navT.json',
            success: function(result){
                //获取竖边导航标题数据
                var j = 0;
                for(var arr in result){
                    var str = ``;
                    for(var i = 0; i < result[arr].length; i++){
                        str += `
                        <div class="inner-pro-list">
                        <a href="${result[arr][i].url}" target="_blank" class="inner-list-name">
                            <img class="lazy-nav" alt="" width="60" height="60" src="${result[arr][i].img}">${result[arr][i].data}
                        </a>
                        <div class="inner-pro-content" id="${arr + i}">
                        </div>
                        </div>
                        `
                    }
                    $(`#nav${j}`).html(str);
                    j++;
                }
                //竖边获取子标题数据
                for(var arr in result){
                    for(var i = 0; i < result[arr].length; i++){
                        var str =``;
                        for(var j = 0; j < result[arr][i].add.length; j++){
                            str += `
                            <a target="_blank" href="${result[arr][i].add[j].url}">${result[arr][i].add[j].data}</a>
                            `
                        }
                        $(`#${arr + i}`).html(str);

                    }

                }
            },
            error: function(msg){
                console.log(msg);
            }
        });
             
    }
    function navT(){
        //竖行nav显示隐藏
        $('#navT').on('mouseenter', 'li', function(){
            $(this).find('.home-inner-secd').show();
        }).on('mouseleave', 'li', function(){
            $(this).find('.home-inner-secd').hide();
        })
    }

    //右侧滑动效果
    //取消a默认样式   
    function scrollTopR(){
        $('.pro-float-box').find('li a').click(function(ev){
            ev.preventDefault();
        })
        var t = 200
        $(window).scroll(function(){
            if($(document).scrollTop() >= t){
                $('.pro-float-toTop').show();
            }else{
                $('.pro-float-toTop').hide();
            }
        });

        $('.pro-float-toTop').click(function(){
            $('body, html').animate({
                scrollTop: 0
            }, 200)
        })
    }
    
    function contentDownload(){
        $.ajax({
            type: 'get',
            url: 'data/data.json',
            success: function(result){
                result = result.data;
                var str = ``;
                for(var i = 0; i < result.length; i++){
                    str += `
                    <a href="#" target="_blank">${result[i].name}</a>
                    `;
                    $(`#ccc${i}`).html(str);
                    str = ``;
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
        $.ajax({
            type: 'get',
            url: 'data/data.json',
            success: function(result){
                result = result.img;
                var str = ``;
                for(var i = 0; i < result.length; i++){
                    str += `
                    <img class="lazy" alt="" width="226" height="630" src="${result[i].src}" id="ccds${result[i].id}">                    `;
                    $(`#ccd${i}`).html(str);
                    str = ``;
                }
                $('#ccds4').attr('height', '310');
            },
            error: function(msg){
                console.log(msg);
            }
        })
        $.ajax({
            type:'get',
            url: 'data/concent.json',
            success: function(result){
                result = result.data;
                var str = ``;
                for(var i = 0; i < result.length; i++){
                    str = `
                    <div class="home-ele-img">
                    <a href="#" target="_blank">
                        <img class="lazy" alt="" src="${result[i].url}">
                    </a>
                </div>
                <div class="home-ele-text" r3code="CH1106214">
                    <h1><a href="#" target="_blank" title="${result[i].name}">${result[i].name}</a></h1>
                    <p>${result[i].tname}</p>
                    <h2>￥${result[i].pay}.00</h2>
                </div> 
                    `;
                    $(`#con${i}`).html(str);
                    str = ``;
                }
            },
            error:function(msg){
                console.log(msg);
            }
        });
    }
    function fixedL(){
        //取消a默认样式
        $('#xhome-fixl').find('a').click(function(ev){
            ev.preventDefault();
            
        })
        $(window).scroll(function(){
            if($(document).scrollTop() >= 400 && $(window).scrollTop() < 800){
                $('.xhome-fixl').find('#xhome-fixl').show().find('li').eq(0).addClass('clicked').siblings().removeClass('clicked');
            }else if($(document).scrollTop() >= 800 && $(window).scrollTop() < 1300){
                $('.xhome-fixl').find('#xhome-fixl').show().find('li').eq(1).addClass('clicked').siblings().removeClass('clicked');
            }else if($(document).scrollTop() >= 1300 && $(window).scrollTop() < 2000){
                $('.xhome-fixl').find('#xhome-fixl').show().find('li').eq(2).addClass('clicked').siblings().removeClass('clicked');
            }else if($(document).scrollTop() >= 2000 && $(window).scrollTop() < 2700){
                $('.xhome-fixl').find('#xhome-fixl').show().find('li').eq(3).addClass('clicked').siblings().removeClass('clicked');
            }else if($(document).scrollTop() >= 2700 && $(window).scrollTop() < 3400){
                $('.xhome-fixl').find('#xhome-fixl').show().find('li').eq(4).addClass('clicked').siblings().removeClass('clicked');
            }else if($(document).scrollTop() >= 3400 && $(window).scrollTop() < 3750){
                $('.xhome-fixl').find('#xhome-fixl').show().find('li').eq(5).addClass('clicked').siblings().removeClass('clicked');
            }else{
                $('.xhome-fixl').find('#xhome-fixl').hide();
            }

        })
        $('#xhome-fixl li').eq(0).find('a').click(function(){
            $('body,html').animate({
                scrollTop: 600,
            }, 500)
        })
        $('#xhome-fixl li').eq(1).find('a').click(function(){
            $('body,html').animate({
                scrollTop: 850,
            }, 500)
        })
        $('#xhome-fixl li').eq(2).find('a').click(function(){
            $('body,html').animate({
                scrollTop: 1570,
            }, 500)
        })
        $('#xhome-fixl li').eq(3).find('a').click(function(){
            $('body,html').animate({
                scrollTop: 2270,
            }, 500)
        })
        $('#xhome-fixl li').eq(4).find('a').click(function(){
            $('body,html').animate({
                scrollTop: 3010,
            }, 500)
        })
        $('#xhome-fixl li').eq(5).find('a').click(function(){
            $('body,html').animate({
                scrollTop: 3730,
            }, 500)
        })
       
    }
    return {
        header: header,
        navDownload: navDownload,
        search: search,
        bannerDownload: bannerDownload,
        banner: banner,
        navT: navT,
        nav: nav,
        navTDownload: navTDownload,
        scrollTopR: scrollTopR,
        contentDownload: contentDownload,
        fixedL: fixedL
    }
});