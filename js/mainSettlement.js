console.log("执行成功");

require.config({
    paths: {
        'jquery': '../js/jquery-1.10.1.min',
        "jquery-cookie": "jquery.cookie",
        'list':'../js/list',
        'index': '../js/index',
        'settlement': '../js/settlement'
    },
    shim:{
        //设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
    }
})

require(['index', 'shopping', 'detailed', 'settlement', 'list'], function(index, shopping, detailed, settlement, list){

    $(function(){
        list.token();
        index.header();
        index.scrollTopR();
        detailed.sc_num();
        settlement.sc_msg();
        settlement.dataDownload();
        settlement.btn();
        // settlement.all();
        console.log($.cookie('jinx'));
    })
       
})