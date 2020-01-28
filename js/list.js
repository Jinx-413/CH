define(function(){
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
            url: '../data/head.json',
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
        $('.pro-his-tj').find('a').click(function(ev){
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
    }

    return {
        navDownload:navDownload,
        search:search,
        navTDownload:navTDownload,
        navT:navT,
        end:end,
        pull:pull,
    }
})