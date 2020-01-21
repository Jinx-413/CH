
define(function(){
    function ajax({method, url, date, success, error}){
        var xhr = null;
        try{
            xhr = new XMLHttpRequest();
        }catch{
            xhr = ActiveXObject('Microsoft.XMLHTML');
        }
    
        if(method == 'get' && date){
            url += '?' + date;
        }
        xhr.open(method, url, true);
    
        if(method == 'get'){
            xhr.send();
        }else{
            xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            xhr.send(date);
        }
    
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    if(success){
                        success(xhr.responseText);
                    }
                }else{
                    if(error){
                        error('error:' + xhr.status);
                    }
                }
            }
        }
    
    }
    
    function requyString(objString){
        var str = "";
        for(var attr in objString){
            str += attr + "=" + objString[attr] + "&";
        }
        return str.substring(0, str.length - 1);
    }

    return {
        ajax: ajax,
        requyString: requyString
    }
})
