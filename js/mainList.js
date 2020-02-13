console.log("执行成功");

require.config({
    paths: {
        'jquery': '../js/jquery-1.10.1.min',
        "jquery-cookie": "jquery.cookie",
        'list':'../js/list',
        'index': '../js/index'
    },
    shim:{
        //设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
    }
})

require(['list', 'index', 'detailed'], function(list, index, detailed){

    $(function(){

        //取消a的默认样式
        $('.home-inner-edit').find('a').click(function(ev){
            ev.preventDefault();
        })
        list.token();
        list.navDownload();
        index.nav();
        list.search();
        list.navTDownload();
        index.navT();
        list.navT();
        index.scrollTopR();
        list.end();
        list.title();
        list.pull();
        list.listData();
        list.dataDownload();
        list.shopping();
        index.header();
        detailed.sc_num();
        detailed.sc_msg();
    })
       
})