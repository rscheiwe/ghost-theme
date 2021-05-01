$(document).ready(function () {

  
  // Share
   $(document).scroll(function () {
      var y = $(this).scrollTop();
      if (y > 280) {
         $('.sharelater').fadeIn();
      }
      else {
         $('.sharelater').fadeOut();
      }
   });

   // Alertbar later
   $(document).scroll(function () {
      var y = $(this).scrollTop();
      if (y > 280) {
         $('.alertbar').fadeIn();
      }
      else {
         $('.alertbar').fadeOut();
      }
   });


   // Hide Header on on scroll down
   var didScroll;
   var lastScrollTop = 0;
   var delta = 5;
   var navbarHeight = $('nav').outerHeight();

   $(window).scroll(function (event) {
      didScroll = true;
   });

   setInterval(function () {
      if (didScroll) {
         hasScrolled();
         didScroll = false;
      }
   }, 250);

   function hasScrolled() {
      var st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
         return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
         // Scroll Down            
         $('nav').removeClass('nav-down').addClass('nav-up');
         $('.nav-up').css('top', -$('nav').outerHeight() + 'px');

      }
      else {
         // Scroll Up
         if (st + $(window).height() < $(document).height()) {
            $('nav').removeClass('nav-up').addClass('nav-down');
            $('.nav-up, .nav-down').css('top', '0px');
         }
      }

      lastScrollTop = st;
   }

   $('.site-content').css('margin-top', $('header').outerHeight() + 'px');

   // minutes to read
   if ($('.post-read').length) {
      var txt = $('.article-post')[0].textContent,
         wordCount = txt.replace(/[^\w ]/g, "").split(/\s+/).length;

      var readingTimeInMinutes = Math.floor(wordCount / 250) + 1;
      var readingTimeAsString = readingTimeInMinutes + " min";
      $('.post-read').html(readingTimeAsString);
   }

   // Smooth scroll to an anchor
   $('a.smoothscroll[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function (event) {
         // On-page links
         if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
         ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) {
               // Only prevent default if animation is actually gonna happen
               event.preventDefault();
               $('html, body').animate({
                  scrollTop: target.offset().top
               }, 1000, function () {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) { // Checking if the target was focused
                     return false;
                  }
                  else {
                     $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                     $target.focus(); // Set focus again
                  };
               });
            }
         }
      });
  
  
});