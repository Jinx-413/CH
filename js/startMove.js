function startMove(node, cssObj, compelet){
    //完美运动
                
    clearInterval(node.timer);
    node.timer = setInterval(function(){

        var isEnd = true; //假设到达目的值;
        for(var attr in cssObj){
            var iTarget = cssObj[attr];
            //计算速度
            var iCur = null;
            if(attr == 'opacity'){
                iCur = parseInt(parseFloat(getStyle(node, attr) * 100));
            }else{
                iCur = parseInt(getStyle(node, attr));
            }

            var speed = (iTarget - iCur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            
            if(attr == 'opacity'){
                iCur += speed;
                node.style.opacity = iCur / 100;
                node.style.filter = `alpha(opacity=${iCur})`;
            }else{
                node.style[attr] = iCur + speed + 'px';

            }
            if(iCur != iTarget){
                isEnd = false;
            }

            
        }
         //等所有动画到达目的值以后，才能关闭定时器
        if(isEnd){
            clearInterval(node.timer);
            if(compelet){
                compelet.call(node);
            }
        }
        
    }, 30);
}

function startFoot(node, attr, iTarget, comlete){
    //链式运动

    clearInterval(node.timer);
    node.timer = setInterval(function(){
        var iCur = 0;
        if(attr == 'opacity'){
            iCur = parseInt(parseFloat(getStyle(node, attr)) * 100);
        }else{
            iCur = parseInt(getStyle(node, attr));
        }
        var speed = (iTarget - iCur) / 8;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if(iTarget == iCur){
            clearInterval(node.timer);
            if(comlete){
                comlete.call(node);
            }
        }else{
            if(attr == 'opacity'){
                iCur += speed;
                node.style.opacity = `${iCur / 100}`;
                node.style.filter = `alpha(opacity=${iCur})`;
            }else{
                node.style[attr] = iCur + speed + 'px';
            }
        }
       
    }, 30);
}

function getStyle(node, cssStyle){
    //获取有效样式兼容写法
    return node.currentStyle ? node.currentStyle[cssStyle] : getComputedStyle(node)[cssStyle];
}