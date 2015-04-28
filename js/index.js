$(function(){
	var winW = $(window).width(),
      winH = $(window).height(),
      startX,
      startY,
      lastStage = $('.slide_stage').length,
      slideBox = $('#slide_box');

	$('#catalogue').find('.container').css({'height':winH - 96,'width':winW - 128});

	slideBox.on('touchstart','.slide_stage',function(event){
		event.preventDefault();
		var myIndex = $(this).attr('id').substr(5,1);
		var touch = event.originalEvent.touches[0];
		startX = touch.pageX + (myIndex-1)*winW;
		startY = touch.pageY;
		slideBox.removeClass('autoslide');
	})

	slideBox.on('touchmove','.slide_stage',function(event){
		event.preventDefault();
		var myIndex = $(this).attr('id').substr(5,1);
    var touch = event.originalEvent.touches[0];
    var x = touch.pageX - startX;
    var y = touch.pageY - startY;

    //判断滑动方向
    var moveDis = touch.pageX - startX + (myIndex-1)*winW;  
    console.log(moveDis)  
    if(myIndex==1 && moveDis>0){
        return false;
    }
    if(myIndex == lastStage && moveDis<0){
        return false;
    }
    slideBox.css('-webkit-transform','translate3d('+ x +'px,0,0)');
	})

	slideBox.on('touchend','.slide_stage',function(event){
    event.preventDefault();
    var myIndex = $(this).attr('id').substr(5,1);
    var touch = event.originalEvent.changedTouches[0];
    var x = touch.pageX - startX + (myIndex-1)*winW;
    var y = touch.pageY - startY;
    $(this).removeClass('active');
    slideBox.addClass('autoslide');
    //向左滑动
    if(myIndex!=lastStage && x<=-50){
        slideBox.css('-webkit-transform','translate3d('+ -myIndex * winW +'px,0,0)');
        $(this).next('.slide_stage').addClass('active');
    }
    //保持原页
    if(x>=-50 && x <50){
        slideBox.css('-webkit-transform','translate3d('+ -(myIndex-1) * winW +'px,0,0)');
    }
    //向右滑动
    if(myIndex!=1 && x>=50){
        slideBox.css('-webkit-transform','translate3d('+ -(myIndex-2) * winW +'px,0,0)');
        $(this).prev('.slide_stage').addClass('active');
    }   
	})

	function blurBg(a){
		if($(a).hasClass('active')){
			$(a).removeClass('active');
			$('#box').removeClass('blur');
			$('.bottom_btn').removeClass('blur');
		}
		else{
			$(a).addClass('active');
			$('#box').addClass('blur');
			$('.bottom_btn').not(a).addClass('blur');
		}
	}
	$('#menu_icon').on('click',function(){	
		if($(this).hasClass('active')){
			$('#catalogue').removeClass('active');
		}
		else{
			$('#catalogue').addClass('active');
		}
		blurBg(this);
	})

	$('#catalogue').find('li').each(function(i){
		$(this).css('-webkit-transition-delay','.'+i+'s');
		if(i>=5){
			$(this).css('-webkit-transition-delay','.5s');	
		}
	})




	$('#home_icon').on('click',function(){
		if($(this).hasClass('active')){
			$('#nav_btns').removeClass('active');
		}
		else{
			$('#nav_btns').addClass('active');
		}
		blurBg(this);
	})

	$('#nav_btns').find('li').each(function(i){
		var i = i*2;
		$(this).css('-webkit-transition-delay','.0'+i+'s');
	})

})