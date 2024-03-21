(function (Drupal) {

  'use strict';

  // Cache frequently accessed elements
  var navbar = document.getElementById('navbar-main');
  var collapseSearch = document.getElementById('CollapseSearch');

  // Sticky navigation
  var sticky = navbar.offsetTop;

  function stickyNav() {
    // Check if viewport width is greater than or equal to 768 pixels (typical tablet portrait breakpoint)
    if (window.innerWidth >= 768) {
      navbar.classList.toggle('sticky', window.scrollY >= sticky);
    } else {
      navbar.classList.remove('sticky'); // Remove sticky class on smaller viewports
    }
  }

  window.addEventListener('scroll', stickyNav);

  // Show search field
  if (collapseSearch) {
    collapseSearch.addEventListener('shown.bs.collapse', function () {
      var inputField = document.getElementById('edit-keys');
      if (inputField) {
        inputField.focus();
      }
    });
  }

  // Animations on viewport
  document.addEventListener('DOMContentLoaded', function () {
    var observer = new IntersectionObserver(handleAnimations, { threshold: 0.1 });

    document.querySelectorAll('.animate-trigger').forEach(function (element) {
      observer.observe(element);
    });

    function handleAnimations(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var animationClasses = entry.target.dataset.animationClasses;
          if (animationClasses) {
            entry.target.classList.add(...animationClasses.split(' '));
          }
          observer.unobserve(entry.target);
        }
      });
    }
  });
})(Drupal);
