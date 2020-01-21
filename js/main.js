console.log("执行成功");

require.config({
    paths: {
        'jquery':'jquery-1.10.1.min',
        'index':'index',
    }
});

require(['index'], function(index){
    $(function(){
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
    })
})