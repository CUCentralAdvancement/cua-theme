/**
 * @file
 * Global utilities.
 *
 */
(function (Drupal) {

  'use strict';

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

})(Drupal);
