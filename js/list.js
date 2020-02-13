define(function(){
    function token(){
        if($.cookie('token')){
            $('.header-login').html(`<a href="" class="user-account" id="user-account" style="margin-right: 10px;">${$.cookie('token')}</a><a href="" id="sso_logout">退出</a>`);
            $('.tool-myCQ-infor-phone').html($.cookie('token'));
            $('#sso_logout').click(function(ev){
                $.cookie('token', null, {
                    path: '/'
                })
            })
        }else{
            $('.header-login').html(`<a href="login.html">登录</a>
            <span>|</span>
            <a href="register.html">注册</a>`);
            $('.tool-myCQ-infor-phone').html('您好请登录');
        }
        
    }
    function navDownload(){
        //导航栏子菜单数据的获取和操作
        //获取数据
        $.ajax({
            type: 'get',
            url: '../data/nav.json',
            success: function(result){
                result = result.nav;
                var str = ``;
                for(var i = 0; i < result.length; i++){
                    if(i == 0){
                        str = `<a href="../index.html" style="color:#000;">${result[i].name}</a>`;
                    }else{
                        str = `<a href="list.html?id=${result[i].id}" target="_blank">${result[i].name}</a>`;
                    }
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
            url: '../data/head.json',
            success: function(result){
                var j = 0;
                var l = 0;
                var k = [0,1,2,5,8,9,11,12,16,17,18,19,24,25,26,27,32,33,34,35]
                for(var arr in result){
                    str =``;
                    for(var i = 0; i < result[arr].length; i++){
                        str += `
                        <div class="home-sub-box">
                        <a href="detailed.html?id=${k[l]}" target="_blank" class="home-goods-img"><img class="lazy-zt" src="${result[arr][i].img}"></a>
                        <p><a href="detailed.html?id=${k[l]}" target="_blank" title="${result[arr][i].data}">${result[arr][i].data}</a></p>
                        <h1>￥${result[arr][i].pay}</h1>
                        <div class="home-sub-line"></div>
                        </div>
                        `
                        l++;
                    }
                    $(`#div${j}`).html(str);
                    j++;
                }
                $('#div5').find('h1').html('');
                $('#div5').find('.home-sub-box').eq(0).find('a').attr('href', 'http://cn.changhong.com/fw/cpbxfw/support.html');
                $('#div5').find('.home-sub-box').eq(1).find('a').attr('href', 'http://cn.changhong.com/fw/azyqyfw/support.html');
                $('#div5').find('.home-sub-box').eq(2).find('a').attr('href', 'http://cn.changhong.com/fw/cpbxfw/fwzc_2/201609/t20160922_55752.html');
                $('#div5').find('.home-sub-box').eq(3).find('a').attr('href', 'http://cn.changhong.com/fw/cjwt/gzpc/');
                
            },
            error: function(msg){
                console.log(msg);
            }
        });

    }
    function search(){
        //搜索框操作
        $.ajax({
            type: 'get',
            url: '../data/orignSearchList.json',
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

    function navTDownload(){
        //获取数据

        $.ajax({
            type: 'get',
            url: '../data/nav.json',
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
            url: '../data/navT.json',
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
        //下拉操作
        var isTure = true;
        $('#edit').click(function(){
            if(isTure){
                $('#navT').slideDown(400);
                isTure = false;
                $(this).find('a').css({
                    background: 'url(../images/inner-icon-red.png) no-repeat 10px center'
                })
            }else{
                $('#navT').slideUp(400);
                isTure = true;
                $(this).find('a').css({
                    background: 'url(../images/inner-icon-gray.png) no-repeat 10px center'
                })            
            }
           
        })
    }
    function end(){
        //为你推荐选项卡操作
        //取消a标签默认样式
        $('.pro-his-tj-title').find('a').click(function(ev){
            ev.preventDefault();
        })
        $('.pro-his-tj').find('#end').on('click', 'a', function(){
            $('.pro-his-tj-container').find('.xpro-his-tj-container').eq($(this).index()).attr('style', 'display: block;font-size:12px;').siblings().attr('style', 'display: none;');
            $(this).addClass('xcheck').siblings().removeClass();
        })
    }
    function pull(){
        //全部结果拉下收起
        var isCur = true;
        if(getParam('id') == 1 || getParam('id') == 2){
            $('#morechoice').show();
            $('#morechoice').click(function(ev){
                ev.preventDefault();
                if(isCur){
                    $(this).find('p').html('收起');
                    $(this).addClass('pro-selector-btn2');
                    $('#screencondition').addClass('pro-conditions-show')
                    isCur = false;
                }else{
                    $(this).find('p').html('分辨率，产品特色等更多条件选择');
                    $(this).removeClass('pro-selector-btn2');
                    $('#screencondition').removeClass('pro-conditions-show')
                    isCur = true;
                }
            })
        }else{
            $('#morechoice').hide();
        };
        
    }
    function title(){
        //获取title
        $.ajax({
            type: 'get',
            url: '../data/nav.json',
            success: function(result){
                result = result.nav;
                var id = getParam("id");
                document.title = result[id].data;
            },
            error: function(msg){
                console.log(msg)
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
    function listData(){
        //选项获取
        $.ajax({
            type: 'get',
            url: '../data/listData.json',
            success: function(result){
                result = result.data;
                var id = getParam('id') - 1;
                var str1 = ` 
                    <div class="com-width">
                        <p>
                            当前位置：
                            <a href="../index.html">首页</a><span> &gt; </span><a href="">${result[id].name}</a>
                        </p>
                    </div>
                `;
                $('#pro-position').html(str1);
                var arr = result[id].arr;
                for(var i = 0; i < arr.length; i++){
                    $(`
                    <div class="pro-selector-row  clearfix" id="arr${i}">
                    <div class="pro-selector-left">
                    <p class="pro-selector-label" cd="${arr[i].name}" id="p${i}">
                    ${arr[i].name}:
                    </p>
                    <a href="" class="pro-selector-all">全部</a>
                    </div>
                    <div class="pro-selector">
                    </div>
                    </div>

                `).appendTo('#screencondition');
                $("#arr0").addClass('pro-selector-type');
                    for(var k = 0; k < arr[i].arr.length; k++){
                        $(`
                        <a href="">${arr[i].arr[k]}</a>
                        `).appendTo(`#arr${i} .pro-selector`);
                        
                    }
                    if($(`#p${i}`).attr('cd') == '价格'){
                        $(`
                        <div class="pro-selector-price">
                        <input id="minPrice" type="text">
                        <span>至</span>
                        <input id="maxPrice" type="text">
                        <input type="button" id="subPrice" value="确认">
                        </div>
                        `).appendTo(`#arr${i} .pro-selector`);
                    }
                    if($(`#p${i}`).attr('cd') == '尺寸'){
                        $(`
                        <p class="pro-selector-watch">（建议观看距离）</p>
                        `).appendTo(`#arr${i} .pro-selector-left`)
                        $(`#arr${i} .pro-selector`).html('');
                        $(`
                        <div class="pro-selector-size">
                            <a href="" >32英寸及以下</a>
                            <a href="" >39-43英寸</a>
                            <a href="" >49-55英寸</a>
                            <a href="" >58-60英寸</a>
                            <a href="" >65英寸及以上</a>
                        </div>
                        <div class="pro-watch-dis" style="width:536px;">
                            <span style="left: 0px"></span>
                            <span style="left: 90px"></span>
                            <span style="left: 270px"></span>
                            <span style="left: 360px"></span>
                            <span style="left: 475px"></span>
                            <p style="margin-left: 40px">&lt;2米</p>
                            <p style="margin-left:100px ">2-3米</p>
                            <p style="margin-left:102px ">3-3.5米</p>
                            <p style="margin-left: 65px">&gt;3.5米</p>
                        </div>
                        `).appendTo(`#arr${i} .pro-selector`);
                      
                    }
                    if($(`#p${i}`).attr('cd') == '其他功能'){
                        $(`#arr${i} .pro-selector-left a`).remove()
                        $(`#arr${i} .pro-selector`).html('');
                        for(var k = 0; k < arr[i].arr.length; k++){
                            $(`
                            <div class="pro-list-other-box" conditionlabel="能效等级" id="nxdj">
                                <div class="pro-list-other">
                                    ${arr[i].arr[k].name}
                                </div>
                                <div class="pro-list-warp" id="w${k}">
                                </div>
                            </div>
                            `).appendTo(`#arr${i} .pro-selector`);
                            for(var j = 0; j < arr[i].arr[k].arr.length; j++){
                                $(`
                                <a href="#">${arr[i].arr[k].arr[j]}</a>
                                `).appendTo(`#w${k}`);
                            }
                        }
                        
                      
                    }
                    
                }

                

            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    function dataDownload(){
        $.ajax({
            type: 'get',
            url: '../data/listData.json',
            success: function(result){
                result = result.data;
                var id = getParam('id') - 1;
                var arr = result[id].list;
                for(var i = 0; i < arr.length; i++){
                    $(`
                    <div class="pro-goods" data-code="CH5007639">
                     <div class="pro-goods-img">
                       <a href="detailed.html?id=${arr[i].id}" target="_blank">
                       <img src="${arr[i].img}" alt="" style="height: 190px; width: 190px;">
                       </a>
                     </div>
                     <div class="pro-goods-text">
                        <h1>
                        <a href="#" target="_blank" title="">${arr[i].data}</a>
                        </h1>
                        <p style="font-size: 12px; margin-top: 10px; color: #888;" id="">${arr[i].p}</p>
                          <p><span id="">￥${arr[i].pay}</span><a href="#">0人评价</a></p>
                     </div>
                     <div class="pro-goods-choose"> 
                        <div class="pro-goods-db">
                          <div class="pro-goods-check">
                            <input type="checkbox" >
                         </div>
                           <p>对比</p>
                         </div>   
                         <div class="pro-goods-starts">
                         <p>收藏</p>
                       </div>  
                       <div class="pro-goods-car" p="${arr[i].id}">
                        <p>加入购物车</p>
                        </div>
                       </div>  
                       </div>
                    `).appendTo('.pro-result-container');
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
    function shopping(){
        //添加产品购物车
        $('.pro-result-container').on('click', '.pro-goods-car p', function(){
            var id = $(this).parent().attr('p');
              //cookie
            //当不存在的时候
            var first = $.cookie('jinx') == null ? true : false;
            if(first){
                var arr = [{id: id, num: 1}];
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
                    var obj = {id: id, num: 1};
                    cookieArr.push(obj);
                }
                $.cookie('jinx', JSON.stringify(cookieArr), {
                    expires: 7,
                    path: '/'
                })
              
            }
            open(`shopping.html?id=${id}`);
        })
       
       
    }

    return {
        navDownload:navDownload,
        search:search,
        navTDownload:navTDownload,
        navT:navT,
        end:end,
        pull:pull,
        title:title,
        listData:listData,
        dataDownload:dataDownload,
        shopping: shopping,
        token: token,
    }
})