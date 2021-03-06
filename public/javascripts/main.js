
(function($) {

    "use strict";

    skel.breakpoints({
        xlarge:    '(max-width: 1680px)',
        large:    '(max-width: 1280px)',
        medium:    '(max-width: 980px)',
        small:    '(max-width: 736px)',
        xsmall:    '(max-width: 480px)'
    });

    $(function() {

        var    $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $banner = $('#banner');

        // Disable animations/transitions until the page has loaded.
            $body.addClass('is-loading');

            $window.on('load', function() {
                window.setTimeout(function() {
                    $body.removeClass('is-loading');
                }, 100);
            });

        // Fix: Placeholder polyfill.
            $('form').placeholder();

        // Prioritize "important" elements on medium.
            skel.on('+medium -medium', function() {
                $.prioritize(
                    '.important\\28 medium\\29',
                    skel.breakpoint('medium').active
                );
            });

        // Header.
            if (skel.vars.IEVersion < 9)
                $header.removeClass('alt');

            if ($banner.length > 0
            &&    $header.hasClass('alt')) {

                $window.on('resize', function() { $window.trigger('scroll'); });

                $banner.scrollex({
                    bottom:        $header.outerHeight(),
                    terminate:    function() { $header.removeClass('alt'); },
                    enter:        function() { $header.addClass('alt'); },
                    leave:        function() { $header.removeClass('alt'); }
                });

            }

        // Menu.
            var $menu = $('#menu');

            $menu._locked = false;

            $menu._lock = function() {

                if ($menu._locked)
                    return false;

                $menu._locked = true;

                window.setTimeout(function() {
                    $menu._locked = false;
                }, 350);

                return true;

            };

            $menu._show = function() {

                if ($menu._lock())
                    $body.addClass('is-menu-visible');

            };

            $menu._hide = function() {

                if ($menu._lock())
                    $body.removeClass('is-menu-visible');

            };

            $menu._toggle = function() {

                if ($menu._lock())
                    $body.toggleClass('is-menu-visible');

            };

            $menu
                .appendTo($body)
                .on('click', function(event) {

                    event.stopPropagation();

                    // Hide.
                        $menu._hide();

                })
                .find('.inner')
                    .on('click', '.close', function(event) {

                        event.preventDefault();
                        event.stopPropagation();
                        event.stopImmediatePropagation();

                        // Hide.
                            $menu._hide();

                    })
                    .on('click', function(event) {
                        event.stopPropagation();
                    })
                    .on('click', 'a', function(event) {

                        var href = $(this).attr('href');

                        event.preventDefault();
                        event.stopPropagation();

                        // Hide.
                            $menu._hide();

                        // Redirect.
                            window.setTimeout(function() {
                                window.location.href = href;
                            }, 350);

                    });

            $body
                .on('click', 'a[href="#menu"]', function(event) {

                    event.stopPropagation();
                    event.preventDefault();

                    // Toggle.
                        $menu._toggle();

                })
                .on('keydown', function(event) {

                    // Hide on escape.
                        if (event.keyCode == 27)
                            $menu._hide();

                });

    });

})(jQuery);

$(document).ready(function(){
    if ('.logoscroll'){
        setTimeout(nextTitle, 3000);
    }

    $('body').on('change', '#oInput3', function(){
        var reflect = $('#oFormCostDollars');
        var currValue = this.options[this.selectedIndex].value;
        $(reflect).html(100 + (45 * currValue));
    });
});


function nextTitle(){
    var elements = $('.logoscroll');
    var active = $('.logoscroll.active');
    var length = elements.length;
    var activeIndex;
    var delay;

    for (i = 0; i < length; i++){
        if ($(elements[i]).hasClass('active')){
            activeIndex = i;
            console.log ('active is: ' + i);
        }
    }

    console.log('active index: ' + activeIndex);
    switch (activeIndex) {
        case (length - 1) :
            $(active).removeClass('active');
            $(elements[0]).addClass('active');
            delay = 4000;
            break;
        default :
            $(active).removeClass('active');
            $(elements[(activeIndex + 1)]).addClass('active');
            delay = 1000;
            break;
    }

    setTimeout(nextTitle, delay);
}
