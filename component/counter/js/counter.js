(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.cuaCounterUpWaypoints = {
    attach: function (context, settings) {
      // Select all elements with the counter-up class
      const $counterUpElements = $('.counter-up', context);

      // Iterate through each counter-up element
      $counterUpElements.each(function(index, element) {
        const $this = $(element);
        // Create a waypoint for the current element
        const waypoint = new Waypoint({
          element: $this[0],
          handler: function (direction) {
            if (direction === 'down') {
              console.log('Waypoint triggered for element:', $this);
              // Animate the current element
              animateCounter($this);
              // Destroy this waypoint to prevent re-triggering
              this.destroy();
            }
          },
          offset: 'bottom-in-view',
        });
      });

      // Function to animate counter
      function animateCounter($element) {
        const countTo = parseFloat($element.data('count'));
        if (!isNaN(countTo)) {
          $({ countNum: 0 }).animate({
                countNum: countTo
              },
              {
                duration: 2000,
                easing: 'linear',
                step: function() {
                  $element.text(commaSeparateNumber(Math.floor(this.countNum)));
                },
                complete: function() {
                  $element.text(commaSeparateNumber(countTo));
                }
              });
        } else {
          console.error('Invalid count value:', countTo);
        }
      }

      // Function to add comma separators to numbers
      function commaSeparateNumber(val) {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  };
})(jQuery, Drupal);
