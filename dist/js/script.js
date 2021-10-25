$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            },
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back-link');    

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
    });
  
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        });
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    minlength: 5
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Имя должно содержать как минимум {0} символа")
                },
                phone: {
                    required: "Пожалуйста, введите свой номер телефона",
                    minlength: jQuery.validator.format("Номер телефона должен содержать как минимум {0} символов")
                },
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForm("#consultation-form");
    validateForm("#consultation form");
    validateForm("#order form");

    $('input[name=phone]').mask('+7 (999) 999 99 99');

    sendMail('form');

    function sendMail(form) {
        $(form).submit(function(e) {
            e.preventDefault();
            if (!$(this).valid()) {
                return;
            }
            $.ajax({
                type: "POST",
                url: "mailer/smart.php",
                data: $(this).serialize()
            }).done(function(){
                $(this).find("input").val("");
                $('#consultation, #order').fadeOut();
                $('.overlay, #thanks').fadeIn();
    
                $('form').trigger('reset');
            });
            return false;
        });
    }

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.up').fadeIn();
        } else {
            $('.up').fadeOut();
        }
    });
    
    $("a[href^='#']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });

    new WOW().init();
  });