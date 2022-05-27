    $(document).ready(function(){
        $('.carousel__inner').slick({
            speed: 1500,
            prevArrow: '<button type="button" class="slick-prev"><img src="img/carusel/arrow_left.png"></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="img/carusel/arrow_right.png"></button>',
            dots: true,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    arrows : false,
                }
            }, ]
        });
    
    
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });
    

        //two separate ways to switch the classes (hide and show list)
/*     $('.catalog-item__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    })

    $('.catalog-item__list__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        })
    }) */
    
    //one function (optimized) for previous operations (stair switcher)
    function classToggler (item){
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        })
    }

    classToggler('.catalog-item__list__link');
    classToggler('.catalog-item__link');

    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn(500);
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut(500);
    });

// this script takes title from catalog-item and put it to modal window + show modal window
    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('.modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn(400);
        })
    });


    function validateForm (form) {
        $(form).validate ({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
                messages: {
                    name: "Пожалуйста, введите ваше имя.",
                    phone: "Пожалуйста, введите номер телефона.",
                    email: {
                      required: "Пожалуйста, введите ваше E-mail.",
                      email: "Формат вашего Email адреса должен быть подобен имя@yandex.ru"
                    },
                  },
            
        });
    }
    
    validateForm('#consultation .feed-form');
    validateForm('#section_form');
    validateForm('#order .feed-form');

    // mask for phone input

    $("input[name=phone]").mask("9 (999) 999-99-99");

    // turn off default settings to not refresh page and add ajax 
    $('form').submit(function(e) {
        e.preventDefault();

        if(!$(this).valid()) {
            return;
        }
        
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize() // подготовка данных к отправлению (serialize)
        }).done(function() {
            $(this).find("input").val(""); // put inputs content to empty - " "
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn(400);
            $('form').trigger('reset'); // reset (clear) the forms
        });
        return false;
    });

    // page up and smooth scroll 

    $(window).scroll(function() {
       if ($(this).scrollTop() > 1600) {
           $('.pageUp').fadeIn()
       } else {
        $('.pageUp').fadeOut()
       }
    });

    $('a[href="#up"').on('click', function() {
        const href = $(this).attr('href');    
        $('html, body').animate({
            scrollTop: $(href).offset().top,
        }, 
         1000, 'linear'
        );
        return false;
    });

    // init wow
    new WOW().init();

  });