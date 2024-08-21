(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.barbaInit = {
    attach: function (context, settings) {
      once('barba-init', 'body', context).forEach(function () {
        // Ensure that Barba.js and GSAP are loaded before initializing
        if (typeof barba !== 'undefined' && typeof gsap !== 'undefined') {
          barba.init({
            transitions: [
              {
                name: 'fade',
                leave(data) {
                  return gsap.to(data.current.container, {
                    opacity: 0
                  });
                },
                enter(data) {
                  return gsap.from(data.next.container, {
                    opacity: 0
                  });
                }
              }
            ]
          });
        }
      });
    }
  };
})(Drupal, once);