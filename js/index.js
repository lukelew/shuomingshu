$(function(){
	var winW = $(window).width(),
      winH = $(window).height(),
      startX,
      startY,
      lastStage = $('.slide_stage').length,
      slideBox = $('#slide_box');
      cata = $('#catalogue');

  //初始化布局
  slideBox.css('width',lastStage*100+'%');
  $('.slide_stage').css('width',(1/lastStage)*100+'%');
	cata.find('.container').css({'height':winH - 96,'width':winW - 128});


	slideBox.on('touchstart','.slide_stage',function(event){
		event.preventDefault();
		myIndex = $(this).attr('id').substr(5,1);
		var touch = event.originalEvent.touches[0];
		startX = touch.pageX + (myIndex-1)*winW;
		startY = touch.pageY;
		slideBox.removeClass('autoslide');
	})

	slideBox.on('touchmove','.slide_stage',function(event){
		event.preventDefault();
    var touch = event.originalEvent.touches[0];
    var x = touch.pageX - startX;
    var y = touch.pageY - startY;

    //判断滑动方向
    var moveDis = touch.pageX - startX + (myIndex-1)*winW;  
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
    var touch = event.originalEvent.changedTouches[0];
    var x = touch.pageX - startX + (myIndex-1)*winW;
    var y = touch.pageY - startY;
    
    slideBox.addClass('autoslide');
    //向左滑动,下一页
    if(myIndex!=lastStage && x<=-50){
      slideBox.css('-webkit-transform','translate3d('+ -myIndex * winW +'px,0,0)');
      $(this).removeClass('active');
      $(this).next('.slide_stage').addClass('active');
    }
    //保持原页
    if(x>=-50 && x <50){
      slideBox.css('-webkit-transform','translate3d('+ -(myIndex-1) * winW +'px,0,0)');
    }
    //向右滑动，前一页
    if(myIndex!=1 && x>=50){
      slideBox.css('-webkit-transform','translate3d('+ -(myIndex-2) * winW +'px,0,0)');
      $(this).removeClass('active');
      $(this).prev('.slide_stage').addClass('active');
    }   
	})

	$('#right_icon').on('click',function(event){
		event.preventDefault();
		var curStage = $('.slide_stage.active').attr('id').substr(5,1);
		if(curStage==lastStage){
			return false;
		}
		slideBox.addClass('autoslide');
		slideBox.css('-webkit-transform','translate3d('+ -curStage * winW +'px,0,0)');
    $('#stage'+curStage).next('.slide_stage').addClass('active');
    $('#stage'+curStage).removeClass('active');
	})

	$('#left_icon').on('click',function(event){
		event.preventDefault();
		var curStage = $('.slide_stage.active').attr('id').substr(5,1);
		if(curStage==1){
			return false;
		}
		slideBox.addClass('autoslide');
		slideBox.css('-webkit-transform','translate3d('+ -(curStage-2) * winW +'px,0,0)');
    $('#stage'+curStage).prev('.slide_stage').addClass('active');
    $('#stage'+curStage).removeClass('active');
	})

	function blurBg(a){
		if($(a).hasClass('active')){
			$(a).removeClass('active');
			$('#slide_box').removeClass('blur');
			$('.bottom_btn').removeClass('blur');
		}
		else{
			$(a).addClass('active');
			$('#slide_box').addClass('blur');
			$('.bottom_btn').not(a).addClass('blur');
		}
	}
	$('#menu_icon').on('click',function(){	
		if($(this).hasClass('active')){
			cata.removeClass('active');
		}
		else{
			cata.addClass('active');
		}
		blurBg(this);
	})

	cata.find('li').each(function(i){
		$(this).css('-webkit-transition-delay','.'+i+'s');
		if(i>=5){
			$(this).css('-webkit-transition-delay','.5s');	
		}
	})
  cata.on('click','a',function(){
    var cataIndex = $('.ca_li').find('a').index(this)+1;
    cata.removeClass('active');
    $('#menu_icon').removeClass('active');
    $('#slide_box').removeClass('blur');
    $('.bottom_btn').removeClass('blur');
    slideBox.css('-webkit-transform','translate3d('+ -(cataIndex-1) * winW +'px,0,0)');
    $('.slide_stage').removeClass('active');
    $('#stage'+cataIndex).addClass('active');
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