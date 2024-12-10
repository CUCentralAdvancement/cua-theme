(function (Drupal, IntersectionObserver) {
  'use strict';

  // Cache frequently accessed elements
  const navbar = document.getElementById('navbar-main');
  const collapseSearch = document.getElementById('CollapseSearch');

  // Sticky navigation
  const sticky = navbar.offsetTop;

  function stickyNav() {
    if (window.innerWidth >= 991) {
      navbar.classList.toggle('sticky', window.scrollY >= sticky);
    } else {
      navbar.classList.remove('sticky');
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
    // Updated IntersectionObserver settings
    const observer = new IntersectionObserver(handleAnimations, {
      threshold: 0.01, // Slightly before fully visible
      rootMargin: "0px 0px -10% 0px" // Element is 10% in the viewport
    });

    // Query animate-trigger elements
    const animateElements = document.querySelectorAll('.animate-trigger');
    if (animateElements.length > 0) {
      animateElements.forEach(function (element) {
        // Ensure element is initially hidden
        element.style.visibility = 'hidden';
        observer.observe(element);
      });
    }

    function handleAnimations(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // Get animation classes from data-animation-classes attribute
          const animationClasses = entry.target.dataset.animationClasses;
          if (animationClasses && animationClasses.trim() !== '') {
            setTimeout(function () {
              // Make the element visible and add animation classes
              entry.target.style.visibility = 'visible';
              entry.target.classList.add(...animationClasses.split(' '));
            }, 1);
          }
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

  // A/B Testing for CU Boulder Funds
  document.addEventListener("DOMContentLoaded", function () {
    // Block IDs
    const blockA = document.getElementById("block--node--call-to-action--1051");
    const blockB = document.getElementById("block--node--call-to-action--401");

    // Check if blocks exist on the page
    if (blockA && blockB) {
      // Retrieve the current variant from localStorage (or use 'A' as default)
      const currentVariant = localStorage.getItem("abTestingVariant") || "A";

      // Toggle visibility based on the current variant
      if (currentVariant === "A") {
        blockA.style.display = "block";
        blockB.style.display = "none";
        localStorage.setItem("abTestingVariant", "B"); // Set the next variant
      } else {
        blockA.style.display = "none";
        blockB.style.display = "block";
        localStorage.setItem("abTestingVariant", "A"); // Set the next variant
      }
    }
  });

})(Drupal, IntersectionObserver);