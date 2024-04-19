



// $(function() {

//     //open 마무스 효과
//     const _root = document.documentElement;
//     const _mouse = document.querySelector('.mouse');
//     const _mouse_mid = document.querySelector('.mouse-mid');
//     const _mouse_guide = document.querySelector('.mouse-guide');

//     const a = 0.4;	// Div follow mouse - speed
//     let _s = 60;		// Div size - hover

//     let x_ = 0;
//     let y_ = 0;
//     let _x = 0;
//     let _y = 0;
//     let _xm_ = 0;
//     let _ym_ = 0;
//     let _x_ = 0;
//     let _y_ = 0;

//     _root.addEventListener('mousemove', function(event) {
//         _x = event.clientX;
//         _y = event.clientY;	
//     }, false);

//     _root.addEventListener('mousedown', function(event) {
//         _mouse.style.width = _s + 'px';
//         _mouse.style.height = _s + 'px';
//     }, false);

//     _root.addEventListener('mouseup', function(event) {
//         _mouse.style.width = (_s / 1.3) + 'px';
//         _mouse.style.height = (_s / 1.3) + 'px';
//     }, false);

//     function main() {
//         requestAnimationFrame(main);
//         x_ += (_x - x_) * a / 2;
//         y_ += (_y - y_) * a / 2;
//         _x_ += (_x - _x_) * a;
//         _y_ += (_y - _y_) * a;
//         _xm_ += (_x - _xm_) * a / 1.5;
//         _ym_ += (_y - _ym_) * a / 1.5;
//         //--
//         _mouse.style.left = x_ + 'px';
//         _mouse.style.top = y_ + 'px';
//         _mouse_mid.style.left = _xm_ + 'px';
//         _mouse_mid.style.top = _ym_ + 'px';
//         _mouse_guide.style.left = _x_ + 'px';
//         _mouse_guide.style.top = _y_ + 'px';
//     }

//     window.addEventListener('load', main, false);



//     const scrollSection = document.querySelector('.maincollect');
//     const scrollContent = document.querySelector('.collectbox');

//     const scrollHeight = scrollSection.clientHeight;
//     const contentWidth = scrollContent.clientWidth;

//     document.addEventListener('scroll', e => {
//         const scrolled = window.pageYOffset;
//         const sectionOffset = Math.abs(scrollSection.offsetTop - scrolled);
//         const notReachedBottom = parseInt(Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight));

//         if (scrollSection.offsetTop <= scrolled && notReachedBottom) {

//         gsap.to(scrollContent, {
//             x: -sectionOffset });

//         }
//     });


    
//     // const scrollSection = document.querySelector('.maincollect');
//     // const scrollContent = document.querySelector('.collectbox');
    
//     // const scrollHeight = scrollSection.clientHeight;
//     // const contentWidth = scrollContent.clientWidth;
    
//     // document.addEventListener('scroll', e => {
//     //     const scrolled = window.pageYOffset;
//     //     const sectionOffset = Math.abs(scrollSection.offsetTop - scrolled);
//     //     const notReachedBottom = parseInt(Math.max(0, scrollSection.getBoundingClientRect().bottom - window.innerHeight));
    
//     //     if (scrollSection.offsetTop <= scrolled && notReachedBottom) {
    
//     //     gsap.to(scrollContent, {
//     //     x: -sectionOffset });
    
//     //     }
//     // });

//     /*GNB배너 모바일 PC*/

//     $(".btnMobOpen").click(function(){

//         $(".gnb").addClass("mobMenuOpen");
//         $('body').addClass('scrollLock');
    
//     });

//     $(".btnMobClose").click(function(){

//         $(".gnb").removeClass("mobMenuOpen");
//         $('body').removeClass('scrollLock');
//     });

//     $(window).resize(function(){
//         if (window.innerWidth > 940) {  // 다바이스 크기가 480이상일때
//             // $('.menu1 > a').mouseenter(function(){
//             //     $(this).next(".sub").stop().slideDown(400);
//             // });
//             // $('.gnbList').mouseleave(function(){
//             //     $(this).next(".sub").stop().slideUp(100);
//             // });
//             function pcmenuhover(){
//                 $('.menu1 > a').mouseenter(function(){
//                     // $(this).toggleClass('ongray').closest("li").siblings().children().removeClass('ongray');
//                     $('.sub').slideUp();
//                     if ($(this).next('.sub').is(':hidden')){
//                         $(this).next('.sub').slideDown(200);
//                         $('.dimmedLayer').show();
//                     } else{
//                         $(this).next('.sub').slideUp(200);
//                     }
//                     return false;
//                 });
//                 $('.menu1').mouseleave(function(){
//                     // $(this).toggleClass('active').closest("li").siblings().children().removeClass('active');
//                     $('.sub').hide();
//                     $('.dimmedLayer').hide(); 
//                     return false;
//                 });
                
//             };
        
//             pcmenuhover();

            
//             $(".btnSearchOpen").click(function(){

//             $(".gnb").removeClass("mobMenuOpen");
//             $(".totalSearchWrap").addClass("totalSearcopen");
//             $('.btnSearchOpen').hide();
//             // $(".header").css('border-bottom',' 0px solid');
//             // $(".menu1 > a").off('mouseenter');
//             $('.menu1 > a').off('mouseenter');
//             $('body').addClass('scrollLock');
//             $('.dimmedLayer').show();
//             });

//             $(".btnsearchclose").click(function(){

//             $(".totalSearchWrap").removeClass("totalSearcopen");
//             $('.btnSearchOpen').show();
//             $('body').removeClass('scrollLock');
//             $('.dimmedLayer').hide();
//             // $(".header").css('border-bottom',' 1px solid #000');
//             pcmenuhover();
//             // $(".menu1 > a").on('mouseenter');
//             // $('.sub').show();
//             });

//             let header = document.querySelector("header");
//             let headerHeight = header.offsetHeight;

//             window.onscroll = function () {
//             let windowTop = window.scrollY;
//             if (windowTop >= headerHeight) {
//                 header.classList.add("sticky");
//             } else {
//                 header.classList.remove("sticky");
//             }
//             };
//         } else {
//             $('.menu1 > a').click(function(){
//                 $(this).toggleClass('active').closest("li").siblings().children().removeClass('active');
//                 $('.sub').slideUp();
//                 if ($(this).next('.sub').is(':hidden')){
//                     $(this).next('.sub').slideDown(200);
//                 } else{
//                     $(this).next('.sub').slideUp(200);
//                 }

//                 return false;
//             });

//             $(".btnSearchOpen").click(function(){

//                 $(".gnb").removeClass("mobMenuOpen");
//                 $(".totalSearchWrap").addClass("totalSearcopen");
//                 $('.btnSearchOpen').hide();
//                 $(".header").css('border-bottom',' 0px solid');
//                 $('body').addClass('scrollLock');
//             });
        
//             $(".btnsearchclose").click(function(){
        
//                 $(".totalSearchWrap").removeClass("totalSearcopen");
//                 $('.btnSearchOpen').show();
//                 $(".header").css('border-bottom',' 1px solid #000');
//                 $('body').removeClass('scrollLock');
//             });
//         }
//     }).resize();



//     $(window).on('scroll', function() {
//         var scrollTop = $(document).scrollTop();
//         var $seasons_box = $('.mainabout .aboutimg_box');
//         var move_01 = scrollTop / 10;
//         var move_02 = scrollTop / 10;
//         var move_03 = scrollTop / 10;
//         var move_04 = scrollTop / 10;
//         $seasons_box.eq(0).find('.box').css({'transform':'translateY('+ move_01 +'px)'});
//         $seasons_box.eq(1).find('.box').css({'transform':'translateY('+ (-move_02) +'px)'});
//         $seasons_box.eq(2).find('.box').css({'transform':'translateY('+ move_03 +'px)'});
//         $seasons_box.eq(3).find('.box').css({'transform':'translateY('+ (-move_04) +'px)'});
//     });
    
    


//     var $cursor = $("#cursor"),
//         $cursor2 = $("#cursor2"),
//         $cursor3 = $("#cursor3");
    
//     $('.cont_newsletter').on("mousemove", function(event) {
//         $cursor.css({ left: event.clientX + "px", top: event.clientY + "px" });
//         $cursor2.css({ left: event.clientX + "px", top: event.clientY + "px" });
//         $cursor3.css({ left: event.clientX + "px", top: event.clientY + "px" });
//     });

//     function addHover() {
//         $cursor2.add($cursor3).addClass("hover hover-2");
//     }

//     function removeHover() {
//         $cursor2.add($cursor3).removeClass("hover hover-2");
//     }



//     removeHover();

//     $(".hover-target, .hover-target-2").hover(addHover, removeHover);

//     $('.img-1, .img-2, .img-3, .img-4').hover(function() {
//         var className = $(this).attr('class');
//         $('.cont_newsletter').addClass(className + '-wrap');
//     }, function() {
//         var className = $(this).attr('class');
//         $('.cont_newsletter').removeClass(className + '-wrap');
//     });


//     $('.cont_newsletter').on('mouseenter', function() {
//         $('.cont_newsletter [class^="cursor"]').css('display', 'block');
//     }).on('mouseleave', function() {
//         $('.cont_newsletter [class^="cursor"]').css('display', 'none');
//     });







//     // var controller = new ScrollMagic.Controller();

//     // var horizontalSlide = new TimelineMax()
//     // // animate panels
//     // .to("#js-slideContainer", 1,   {x: "-20%"})	
//     // .to("#js-slideContainer", 1,   {x: "-40%"})
//     // .to("#js-slideContainer", 1,   {x: "-60%"})
//     // .to("#js-slideContainer", 1,   {x: "-80%"})
  
  
//     // // create scene to pin and link animation
//     // new ScrollMagic.Scene({
//     //   triggerElement: "#js-wrapper",
//     //   triggerHook: "onLeave",
//     //   duration: "400%"
//     // })
//     //   .setPin("#js-wrapper")
//     //   .setTween(horizontalSlide)
//     //   //.addIndicators() // add indicators (requires plugin)
//     //   .addTo(controller);
    




// /*
// // faq
// $('.faq__list .faq__subject').on('click' , function(){

//     if($(this).parent('li').is('.active')){
//         $(this).parent('li').removeClass('active')
//         $(this).siblings('.faq__cont').stop().slideUp(250);
//     } else {
//         $(this).parent('li').addClass('active')
//         $(this).siblings('.faq__cont').stop().slideDown(250);
//     }
// })

// // dropmenu
// $('.dropmenu .trigger').on('click' , function(){
//     if($(this).is('.active')){
//         $(this).removeClass('active')
//     } else {
//         $(this).addClass('active')
//     }
// })
// */


// // config 변수
// // var xl = 1000;

// // 전역함수
// // var $window = $(window),
// //     $windowWidth = $window.width(),
// //     $body = $('body'),
// //     $header = $('#header'),
// //     $nav = $('#nav');

// //넓이 리턴 함수
// // function returnWidth(){
// //     $windowWidth = $window.width();
// //     return $windowWidth;
// // }


// })



$(function() {


    // config 변수
    var xl = 1000;
    
    // 전역함수
    var $window = $(window),
        $windowWidth = $window.width(),
        $body = $('body'),
        $header = $('#header'),
        $nav = $('#nav');
    
    // 넓이 리턴 함수
    function returnWidth(){
        $windowWidth = $window.width();
        return $windowWidth;
    }
    
    // menu
    $('.btn_guide_menu').on('click', function(){
        $body.toggleClass('full')
    })
    
    var _menu = $('.guide_top strong').text(),
        _page = $('.guide_top span').text();
    
    $('.guide_gnb > li > a').each(function(){
        var _txt =  $(this).text();
    
        if(_txt == _menu){
            $(this).parent('li').addClass('open')
            var _menu2 = $(this).siblings('ul');
    
            _menu2.find('li').each(function(){
                var _txt =  $(this).find('a').text();
    
                if(_txt == _page){
                    $(this).addClass('active')
                }
            })
        }
    })
    
    
    $('.guide_gnb > li > a').on('click' , function(){
        if(!$(this).parent('li').is('.open')){
    
            if($(this).parent('li').is('.active')){
                $(this).parent('li').removeClass('active')
                $(this).siblings('ul').stop().slideUp(250);
            } else {
                $(this).parent('li').siblings('li').removeClass('active')
                $(this).parent('li').siblings('li:not(".open")').find('ul').stop().slideUp(250);
                $(this).parent('li').addClass('active')
                $(this).siblings('ul').stop().slideDown(250);
            }
    
        }
    })
    
    // faq
    $('.faq__list .faq__subject').on('click' , function(){
    
        if($(this).parent('li').is('.active')){
            $(this).parent('li').removeClass('active')
            $(this).siblings('.faq__cont').stop().slideUp(250);
        } else {
            $(this).parent('li').addClass('active')
            $(this).siblings('.faq__cont').stop().slideDown(250);
        }
    })
    
    // dropmenu
    $('.dropmenu .trigger').on('click' , function(){
        if($(this).is('.active')){
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
        }
    })
    
    })
    