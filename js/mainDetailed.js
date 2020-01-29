console.log("执行成功");

require.config({
    paths: {
        'jquery': '../js/jquery-1.10.1.min',
        'list':'../js/list',
        'index': '../js/index',
        "detailed": '../js/detailed',
    }
})

require(['list', 'index', 'detailed'], function(list, index, detailed){

    $(function(){

        //取消a的默认样式
        $('.home-inner-edit').find('a').click(function(ev){
            ev.preventDefault();
        })
        list.navDownload();
        index.nav();
        list.search();
        list.navTDownload();
        index.navT();
        list.navT();
        index.scrollTopR();
    })
       
})