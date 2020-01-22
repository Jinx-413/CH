console.log("执行成功");

require.config({
    paths: {
        'jquery': '../js/jquery-1.10.1.min',
        'list':'../js/list',
        'index': '../js/index'
    }
})

require(['list', 'index'], function(list, index){

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
    })
       
})