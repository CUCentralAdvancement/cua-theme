/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.cuaCounterUpWaypoints = {
    attach: function (context, settings) {
      // Define the waypoint
      var waypoint = new Waypoint({
        element: $('.counter-up', context),
        handler: function() {
          $('.counter-up', context).each(function() {
            var $this = $(this);
            var countTo = parseFloat($this.data('count')); // Parse as float
            if (!isNaN(countTo)) { // Check if it's a valid number
              $({ countNum: $this.text() }).animate({
                    countNum: countTo
                  },
                  {
                    duration: 1000,
                    easing: 'linear',
                    step: function() {
                      $this.text(commaSeparateNumber(Math.floor(this.countNum)));
                    },
                    complete: function() {
                      $this.text(commaSeparateNumber(countTo));
                    }
                  });
            } else {
              console.error('Invalid count value:', countTo); // Log error to console
            }
          });
          // Destroy the waypoint after it's triggered once
          this.destroy();
        },
        offset: 'bottom-in-view' // Trigger the handler when bottom of the element hits the bottom of the viewport
      });

      function commaSeparateNumber(val) {
        while (/(\d+)(\d{3})/.test(val.toString())) {
          val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
        }
        return val;
      }
    }
  };

})(jQuery, Drupal);
