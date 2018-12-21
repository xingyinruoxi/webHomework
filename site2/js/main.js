$(".top_list ul li").click(function () {
    $(this).addClass("on").siblings().removeClass("on");
})

$(".ywxt_list dl").mouseover(function () {
    var index = $(this).index();
    $('div.ywxt_text > div').eq(index).show().siblings().hide();
});

$(function () {

    //轮播图
    function slidePic() {
        var $next = $('#next'),
            $prev = $('#prev'),
            arrPic = $('.list-pic').find('li'),
            slidePic = $('#slidePic');
        var iNow = 0;
        var timer = null;

        function toRun() {
            iNow++;
            arrPic.eq(iNow%3).fadeIn('1000').siblings().fadeOut('1000');
        }

        timer = setInterval(toRun, 2000);
        slidePic.hover(function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(toRun, 2000);
        })

    }

    function login() {
        var btnLogin = $('.btn-login'),
            mask = $('#mask'),
            modal = $('.dl-modal'),
            errer = $('.errer'),
            arrInput = modal.find('input'),
            btnSubmt = $('.btn-submit'),
            btnCloseModal = $('.dl-modal').find('.btn-close');


        if (!localStorage.getItem('login')) {
            mask.fadeIn(function () {
                modal.animate({top: '50%'}, 'slow');
                $('.btn-login').show('fast');
                $('.userInfo').hide('fast');
            });
        } else {
            $('body').css('overflow', 'auto');
            $('.btn-login').hide('fast');
            $('.userInfo').show('fast');
        }

        function closeModal() {
            $('body').css('overflow', 'auto');
            modal.animate({top: '-500px'}, 'slow', function () {
                mask.fadeOut();
                $('.btn-login').hide('fast');
                $('.userInfo').show('fast');
                arrInput.val('');
                localStorage.setItem('login', true)
            })
        }

        function openModal() {
            $('body').css('overflow', 'hidden');
            mask.fadeIn(function () {
                modal.animate({top: '50%'}, 'slow');
                $('.btn-login').show('fast');
                $('.userInfo').hide('fast');
                localStorage.removeItem('login')
            });
        }

        arrInput.keyup(function () {
            var userName = $('.userName').val();
            var userPwd = $('.userPwd').val();
            if (userName !== '' && userPwd !== '') {
                $('.btn-submit').removeAttr("disabled")
            } else {
                $('.btn-submit').attr("disabled", true);
            }

        });
        $('.btn-layout').click(function () {
            openModal();
        });
        btnCloseModal.click(function () {
            closeModal();
        });
        btnSubmt.click(function () {
            var userName = $('.userName').val();
            var userPwd = $('.userPwd').val();
            if (userName === 'admin' && userPwd === 'admin123') {
                closeModal();
                errer.hide('fast');

            } else {
                errer.show('fast')
            }
        });
        btnLogin.click(function () {
            openModal();
        })
    }


    var subNav_active = $("#shouye");
    var subNav_scroll = function (target) {
        subNav_active.removeClass("on");
        target.parent().addClass('on');
        subNav_active = target.parent();
    };
    <!--导航点击事件-->
    $(".top_list ul li a").click(function (e) {
        e.preventDefault();
        subNav_scroll($(this));
        var target = $(this).attr("href");
        var targetScroll = $("." + target).offset().top - 70;
        if (/(msie)|(trident)/.test(navigator.userAgent.toLowerCase())) {
            $("html,body").scrollTop(targetScroll)
        } else {
            $("html,body").animate({scrollTop: targetScroll}, 300);
        }

    });
    //页面跳转时定位
    if (window.location.hash) {
        var targetScroll = $(window.location.hash).offset().top - 70;
        $("html,body").animate({scrollTop: targetScroll}, 300)
    }
    //页面滚动时定位
    $(window).scroll(function () {
        var targetTop = $(this).scrollTop();
        var toTop = $('.btn-back-top');
        toTop.hide();
        if (targetTop < 600) {
            toTop.hide();
        } else {
            toTop.show();
        }
        if (targetTop < 800) {
            subNav_scroll($(".div1"));
        } else if (targetTop > 800 && targetTop < 1750) {
            subNav_scroll($(".div2"));
        } else if (targetTop > 1750 && targetTop < 2400) {
            subNav_scroll($(".div3"));
        } else if (targetTop > 2400 && targetTop < 3500) {
            subNav_scroll($(".div4"));
        } else if (targetTop > 3500) {
            subNav_scroll($(".div5"));
        }
    });
    $(".footer_main_top ul li a").click(function (e) {
        e.preventDefault();
        subNav_scroll($(this));
        var target = $(this).attr("href");
        var targetScroll = $("." + target).offset().top - 70;
        if (/(msie)|(trident)/.test(navigator.userAgent.toLowerCase())) {
            $("html,body").scrollTop(targetScroll)
        } else {
            $("html,body").animate({scrollTop: targetScroll}, 300);
        }
    });

    //禁止右键点击
    /* $('body').bind('contextmenu', function() {
         return false;
     });*/

    //返回顶部
    function toTop() {
        var btnTop = $('.btn-back-top');
        btnTop.click(function () {
            $('html,body').animate({scrollTop: 0}, 'slow');
        });
    }

    slidePic();//轮播图
    toTop();
    login()//登录
}());
