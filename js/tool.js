function bubbleSort(arr){
    //冒泡排序
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = 0; j < arr.length - i - 1; j++){
            if(arr[j] > arr[j + 1]){
                var tep = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tep;
            }
        }
    }
}

function chooseSort(arr){
    //选择排序
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = i + 1; j < arr.length; j++){
            if(arr[i] > arr[j]){
                var tep = arr[i];
                arr[i] = arr[j];
                arr[j] = tep;
            }
        }
    }
}

function heavyOrder(arr){
    //顺序去重
    for(var i = 0; i < arr.length - 1; i++){
        for(var j = i + 1; j < arr.length; j++){
            if(arr[i] === arr[j]){
                arr.splice(j, 1);
                j--;
            }
        }
    }
}

function reverseOrder(arr){
    //倒序去重
    for(var i = arr.length - 1; i > 0; i--){
        for(var j = i - 1; j >= 0; j--){
            if(arr[i] === arr[j]){
                arr.splice(j, 1);
            }
        }
    }
}

function order(arr){
    //固定写法
    arr = [... new Set(arr)];
}

function numCode(n){
    //数字验证码
    var arr = [];
    for(var i = 0; i < n; i++){
        arr.push(parseInt(Math.random() * 10));
    }
    return arr;
}

function abcNumCode(n){
    //字母数字组合验证码
    var arr = [];
    for(var i = 0; i < n; i++){
        var tep = parseInt(Math.random() * 123);
        if(tep >= 0 && tep <= 9){
            arr.push(tep);
        }else if(tep >= 65 && tep <= 90 || tep >= 97 && tep <= 122){
            arr.push(String.fromCharCode(tep));
        }else{
            i--;
        }
    }
    return arr;
}

function byClassName(node, classStr){
    //getElEmentsByClassName兼容方法
    var nodes = node.getElementsByTagName("*");
    var arr = [];
    for(var i = 0; i < nodes.length; i++){
        if(nodes[i].className === classStr){
            arr.push(nodes[i]);
        }
    }
    return arr;
}

function getStyle(node, cssStyle){
    //获取有效样式兼容写法
    return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}

function randomColor(){
    //随机颜色
    var str = "rgba(" + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + parseInt(Math.random() * 256) + "," + 1 + ")";
    return str;
}

function showTime(){
    //获取当前时间
    var n = new Date();
    var year = n.getFullYear();
    var month = n.getMonth() + 1;
    var day = n.getDate();
    var week = chinese(n.getDay());
    var hour = doubleZero(n.getHours());
    var min = doubleZero(n.getMinutes());
    var sec = doubleZero(n.getSeconds());
    var date = year + "年" + month + "月" + day + "日 星期" + week + " "  + hour + ":" + min + ":" + sec;
    return date;
}

function chinese(n){
    //数字变中文
    var arr = ["日", "一", "二", "三", "四", "五", "六"];
    for(var i = 0; i < arr.length; i++){
        return arr[n];
    }
}

function doubleZero(n){
    //双零
    return n < 10 ? "0" + n : n;
}

function stopBubble(ev){
    //阻止事件冒泡
    if(ev.stopPropagation){
        ev.stopPropagation();
    }else{
        ev.cancelBubble=true;
    }
}

function drag(node){
    //拖拽
    node.onmousedown = function(ev){
        var e = ev || window.event;
        var tagX = e.clientX - node.offsetLeft;
        var tagY = e.clientY - node.offsetTop;

        document.onmousemove = function(ev){
            var e = ev || window.event;
            node.style.left = e.clientX - tagX + 'px';
            node.style.top = e.clientY - tagY + 'px';
        }
    }
}

function preDef(ev){
    //阻止超链接默认行为
    if(ev.preventDefault){
        ev.preventDefault();
    }else{
        window.event.returnValue = false;
    }
}

function nbDrag(node){
    //牛逼拖拽
    node.onmousedown = function(ev){
    var e = ev || window.event;
    var tagX = e.clientX - node.offsetLeft;
    var tagY = e.clientY - node.offsetTop;
    document.onmousemove = function(ev){
        var e = ev || window.event;
        var l = e.clientX - tagX;
        var h = e.clientY - tagY
        var X = document.documentElement.clientWidth || document.body.clientWidth;
        var Y = document.documentElement.clientHeight || document.body.clientHeight;
      
        if(l <= 0){
            l = 0;
        }
        if(h <= 0){
            h = 0;
        }
        if(l + node.offsetWidth >= X){
            l =  X - node.offsetWidth;
        }
        if(h + node.offsetHeight >= Y){
            h =  Y - node.offsetHeight;
        }
        node.style.left = l + 'px';
        node.style.top = h + 'px';
    }
    }
    div.onmouseup = function(){
        document.onmousemove = null;
    }
}

function addEvent(node, eventType, funcName){
    //使用事件监听
    if(node.addEventListener){
        node.addEventListener(eventType, funcName, false);
    }else{
        node.attachEvent("on" + eventType, funcName);
    }
}

function removeEvent(node, eventType, funcName){
    //取消事件监听
    if(node.removeEventListener){
        node.removeEventListener(eventType, funcName);
    }else{
        node.detachEvent("on" + eventType, funcName);
    }
}

function chineseParrent(){
    //中文正则
    return /^[\u4e00-\u9fa5]+$/;
}