jQuery(document).ready(function($) {
  /*loadpage*/
  "use strict";
  setTimeout(function() {
      jQuery('.loadpage').hide();
  }, 100);

  "use strict";
  lightGallery(document.getElementById('lightgallery'));

  "use strict";
  jQuery(window).trigger('resize').trigger('scroll');
  jQuery('.page-heading').parallax({imageSrc: 'pic/banner-page1.png',});

  "use strict";
  jQuery(window).bind('resize', function() {
  clearTimeout(timer);
  var timer = setTimeout(function(){ $(window).resize(); }, 80);
  });

//scroll menu
  "use strict";
    var scroll_menu = jQuery(window).scrollTop();

    if(scroll_menu > 0){
      jQuery('.site-header1').hide();
      jQuery('.site-header').addClass('menuScroll');
      jQuery('.site-header').addClass('fadeInDown');
    }else{
      jQuery('.site-header1').show();
      jQuery('.site-header').removeClass('menuScroll');
      jQuery('.site-header').removeClass('fadeInDown');
    }

    jQuery(window).scroll(function(event) {
      "use strict";
        var scroll_menu = jQuery(window).scrollTop();

        if(scroll_menu > 0){
          jQuery('.site-header1').hide();
          jQuery('.site-header').addClass('menuScroll');
          jQuery('.site-header').addClass('fadeInDown');
        }else{
          jQuery('.site-header1').show();
          jQuery('.site-header').removeClass('menuScroll');
          jQuery('.site-header').removeClass('fadeInDown');
        }          
    });
});










