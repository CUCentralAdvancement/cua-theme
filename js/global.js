(function (Drupal, IntersectionObserver) {
  'use strict';

  // Cache frequently accessed elements
  const navbar = document.getElementById('navbar-main');
  const collapseSearch = document.getElementById('CollapseSearch');

  // Sticky navigation
  const sticky = navbar.offsetTop;

  function stickyNav() {
    // Check if viewport width is greater than or equal to 991 pixels (typical tablet portrait breakpoint)
    if (window.innerWidth >= 991) {
      navbar.classList.toggle('sticky', window.scrollY >= sticky);
    } else {
      navbar.classList.remove('sticky'); // Remove sticky class on smaller viewports
    }
  }

  window.addEventListener('scroll', stickyNav);

  // Show search field
  if (collapseSearch) {
    collapseSearch.addEventListener('shown.bs.collapse', function () {
      const inputField = document.getElementById('edit-keys');
      if (inputField) {
        inputField.focus();
      }
    });
  }

  // Animations on viewport
  document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver(handleAnimations, { threshold: 0.1 });

    // Check if there are elements with the class 'animate-trigger'
    const animateElements = document.querySelectorAll('.animate-trigger');
    if (animateElements.length > 0) {
      // Observe each animate-trigger element
      animateElements.forEach(function (element) {
        observer.observe(element);
      });
    }

    function handleAnimations(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Get animation classes from data-animation-classes attribute
          const animationClasses = entry.target.dataset.animationClasses;
          if (animationClasses && animationClasses.trim() !== '') {
            // Delay the addition of animation classes
            setTimeout(function () {
              // Add animation classes to the element's classList
              entry.target.classList.add(...animationClasses.split(' '));
            }, 1); // Adjust the delay time as needed
          }
          // Stop observing the element to avoid redundant animations
          observer.unobserve(entry.target);
        }
      });
    }
  });

  // Animations for layout builder
  document.addEventListener('DOMContentLoaded', function () {
    const collapseElement = document.getElementById('collapseBuilder');
    const linkElement = document.getElementById('collapseLink');

    if (collapseElement && linkElement) {
      collapseElement.addEventListener('shown.bs.collapse', function () {
        linkElement.innerHTML = '<i class="fas fa-times"></i><span class="px-3">Close</span>';
      });

      collapseElement.addEventListener('hidden.bs.collapse', function () {
        linkElement.innerHTML = '<i class="fas fa-save"></i><span class="px-4">Save</span>';
      });
    }
  });

})(Drupal, IntersectionObserver);
