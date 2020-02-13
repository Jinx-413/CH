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

require(['index', 'shopping', 'detailed', 'list'], function(index, shopping, detailed, list){

    $(function(){
        list.token();
        index.header();
        index.scrollTopR();
        shopping.dataDownload();
        detailed.sc_num();
        detailed.sc_msg();
        console.log($.cookie('jinx'));
    })
       
})