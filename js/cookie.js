function $cookie(name){
    //arguments
    switch(arguments.length){
        case 1:
            getCookie(name);
            break;
        case 2:
            arguments[1] == null ? removeCookie(name) : setCookie(name, arguments[1], {});
            break;
        case 3:
            setCookie(name, arguments[1], arguments[2]);
            break;
        default:
            break;
    }
}


function setCookie(name, value, {expires, path, domain, secure}){
    var cookieStr = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if(expires){
        cookieStr += ";expires=" + lastTime(expires);
    }
    if(path){
        cookieStr += ';path=' + path;
    }
    if(domain){
        cookieStr += ';domain=' + domain;
    }
    if(secure){
        cookieStr += ';secure'
    }
    document.cookie = cookieStr;
}

function removeCookie(name){
    document.cookie = encodeURIComponent(name) + '=;expires=' + new Date(0);
}

function getCookie(name){
    var cookieStr = decodeURIComponent(document.cookie);
    
    var start = cookieStr.indexOf(name);

    if(start == -1){
        return null;
    }else{
        var end = cookieStr.indexOf(";", start);
        if(end == -1){
            end = cookieStr.length;
        }
    }

    var str = cookieStr.substring(start,end);
    return str.split("=")[1];
}

function lastTime(n){
    var date = new Date();
    var day = date.getDate();
    date.setDate(day + n);
    return date;
}