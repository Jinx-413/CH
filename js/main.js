console.log("执行成功");

require.config({
    paths: {
        'jquery':'jquery-1.10.1.min',
        "jquery-cookie": "jquery.cookie",
        'index':'index',
        'detailed': 'detailed'
    },
    shim:{
        //设置jquery-cookie依赖于jquery开发的
		"jquery-cookie": ["jquery"],
    }
});

require(['index', 'detailed'], function(index, detailed){
    $(function(){
        index.token();
        index.header();
        index.navDownload();
        index.nav();
        index.search();
        index.bannerDownload();
        index.banner();
        index.navTDownload();
        index.navT();
        index.scrollTopR();
        index.contentDownload();
        index.fixedL();
        detailed.sc_num();
        detailed.sc_msgg();
        console.log($.cookie('jinx'));
        //服务器路径bug解决
        //jinx
    })
})