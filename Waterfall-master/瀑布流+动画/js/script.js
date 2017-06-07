$( window ).on( "load", function(){
    waterfall();
    // 调用waterfall函 数
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    $(window).on('scroll',function(){
        if(checkScrollSlide){
            $.each(dataInt.data,function(key,value){
                var oBox=$('<div>').addClass('pin').appendTo($('#main'));
                var oPic=$('<div>').addClass('box').appendTo(oBox);
                $('<img>').attr('src','images/'+$(value).attr('src')).appendTo(oPic);
            });
            waterfluit();
        }
    })
});
var _al = [];
function waterfall(){
    // 计算及定位数据块显示分散效果
    var _pin = $("#main").find(".pin");
    var _pw = _pin.eq(0).outerWidth();
    var _wh = Math.floor($(window).height()/2);
    var _ww = $(window).width();

    var _co = Math.floor(_ww/_pw);
    var _pi = _pin.length;
    // 初始化数组
    for(var i in _pin){
    if(i<_co){
    _al.push(0);
    }
    _pin.eq(i).css({
    top:_wh,
    left:'50%',
    'margin-top':-(_pin.height()/2)+((Math.floor(Math.random()*10)<5?-1:1)*Math.floor(Math.random()*200)),
    'margin-left':-(_pin.width()/2)+((Math.floor(Math.random()*10)<5?-1:1)*Math.floor(Math.random()*200))
    });
    }
    animateWater(_pin,0,_pw);
}

function checkScrollSlide(){
    // 检测是否具备了加载数据块的条件
    var $lastBox=$('.pin').last();
    var lastBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
    var scrollTop=$(window).scrollTop();
    var documentH=$(window).height();
    return (lastBoxDis<scrollTop+documentH)?true:false;
}
function waterfluit(){
    var hArr=[];
    var _pins=$('.pin');
    var _pw=_pins.eq(0).outerWidth();
    var _cw=$(window).width();
    var _cols=Math.floor(_cw/_pw);
    $.each(_pins,function(key,val){
        if(key<_cols){
            hArr[key]=$(val).outerHeight();
        }else{
            var minH=Math.min.apply(null,hArr);
            var minHIndex= $.inArray(minH,hArr);
            $(val).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*_pw+'px'
            });
            hArr[minHIndex]+=_pins.eq(key).outerHeight();
        }
    });
}

function animateWater(_pin,_i,_pw){
    var _t = getMin(_al);
    _pin.eq(_i).animate({
    left:_t*_pw,
    'margin':0,
    top:_al[_t]
    },300,function(){
    _al[_t]+=_pin.eq(_i).outerHeight();
    _i++;
    animateWater(_pin,_i,_pw);
    });
}

function getMin(_al){
    var _minT = Math.min.apply(null,_al);
    for(var i in _al){
    if(_al[i]==_minT){
    return i;
    }
    }
    }