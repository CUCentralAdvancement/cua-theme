/**
 * @file
 * Global utilities.
 *
 */
(function (Drupal) {

  'use strict';

  /**
   * show search field
   */
  Drupal.behaviors.cu_theme = {
    attach: function (context, settings) {
      var collapseSearch = document.getElementById('CollapseSearch');
      if (collapseSearch) {
        collapseSearch.addEventListener('shown.bs.collapse', function () {
          var inputField = document.getElementById('edit-keys');
          if (inputField) {
            inputField.focus();
          }
        });
      }
    }
  };

  /**
   * Sticky Menu
   */
  var navbar = document.getElementById('navbar-main');
  var sticky = navbar.offsetTop;

  function stickyNav() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

  window.onscroll = function() {
    stickyNav();
  };

  /**
   * animations viewpoint
   */
  document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll(".animate-trigger");

    function handleAnimations(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animationClasses = entry.target.dataset.animationClasses;
          if (animationClasses) {
            animationClasses.split(" ").forEach(className => {
              entry.target.classList.add(className);
            });
          }
          observer.unobserve(entry.target);
        }
      });
    }

    const observer = new IntersectionObserver(handleAnimations, { threshold: 0.1 });

    elements.forEach(element => {
      observer.observe(element);
    });
  });

})(Drupal);
